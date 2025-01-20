import {useFrame} from '@react-three/fiber'
import {RigidBody, vec3} from '@react-three/rapier'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import * as THREE from 'three'
import {useCloneGltf} from '../../../hooks/useCloneGltf'
import {useZustand} from '../../../store/useZustand'
import {CHARACTER_SCALE, CHARACTER_URLS, DEFAULT_ANGULAR_DAMPING, DEFAULT_LINEAR_DAMPING, QUIT_ORIGIN_POS, TOLERANCE_DISTANCE, WALKING_SPEED} from '../../../utils/constants'
import {assertDefined} from '../../../utils/custom.assert'
import {customDebug} from '../../../utils/custom.debug'


export const Character = ({index}) => {
  assertDefined(index)
  const {
    usersInitPos,
    usersDesPos,
  } = useZustand()
  const [prevAction, setPrevAction] = useState(null)
  const [stopped, setStopped] = useState(null)
  const [isFirstMove, setIsFirstMove] = useState(true)
  const [isQuit, setIsQuit] = useState(true)

  const rigidBody = useRef(null)
  // const {modelScene, actions, mixer} = useCloneFbx(CHARACTER_URLS[index % CHARACTER_URLS.length])
  const {modelScene, actions, mixer} = useCloneGltf(CHARACTER_URLS[index % CHARACTER_URLS.length])

  useEffect(() => {
    if (!modelScene || !mixer) {
      return
    }

    // Play idle animation at first
    mixer.timeScale = 1
    activateAllActions()
    setAllWeight(0)
    playIdleAnimOnly()
  }, [mixer, modelScene])

  // Move model to destination position
  useFrame((state, delta) => {
    if (rigidBody.current) {
      const curPos = vec3(rigidBody.current.translation())
      tempObject.position.copy(curPos)

      if (usersDesPos[index]) {
        const userDesPos = usersDesPos[index]
        const desPos = new THREE.Vector3(userDesPos[0], userDesPos[1], userDesPos[2])
        tempObject.lookAt(desPos)
        const desDirec = desPos.sub(curPos)
        const desDirecLen = desDirec.length()
        const normalDesDirec = desDirec.normalize()
        normalDesDirec.setY(0)
        const quitDirecLen = quitPosVec3.clone().sub(curPos).length()
        const newIsQuit = quitDirecLen <= TOLERANCE_DISTANCE

        if (desDirecLen > TOLERANCE_DISTANCE) {
          if (isFirstMove) {
            customDebug().log(`Character#useFrame: character ${index + 1} moving`)
            setIsQuit(false)
            playWalkAnimOnly()
            setIsFirstMove(false)
            setStopped(false)
            if (newIsQuit) {
              rigidBody.current.applyImpulse(normalDesDirec.multiplyScalar(WALKING_SPEED * TOLERANCE_DISTANCE * 6), true)
            } else {
              rigidBody.current.applyImpulse(normalDesDirec.multiplyScalar(WALKING_SPEED * 3), true)
            }
          } else {
            rigidBody.current.applyImpulse(normalDesDirec.multiplyScalar(WALKING_SPEED), true)
          }

          rigidBody.current.setRotation(tempObject.quaternion, true)
        } else if (!stopped) {
          customDebug().log(`Character#useFrame: character ${index + 1} stopped`)
          setIsQuit(newIsQuit)
          playIdleAnimOnly()
          setIsFirstMove(true)
          setStopped(true)
          if (newIsQuit) {
            rigidBody.current.applyImpulse(normalDesDirec.multiplyScalar(WALKING_SPEED * TOLERANCE_DISTANCE * 3), true)
          } else {
            rigidBody.current.applyImpulse(normalDesDirec.multiplyScalar(WALKING_SPEED * 3), true)
          }
        }
      }
    }

    if (mixer) {
      mixer.update(delta)
    }
  })

  const deactivateAllActions = useCallback(() => {
    Object.keys(actions).forEach((actionKey) => {
      actions[actionKey].stop()
    })
  }, [actions])

  const activateAllActions = useCallback(() => {
    // customDebug().log('Character#activateAllActions: actions: ', actions)
    Object.keys(actions).forEach((actionKey) => {
      actions[actionKey].play()
    })
  }, [actions])

  const unPauseAllActions = useCallback(() => {
    Object.keys(actions).forEach((actionKey) => {
      actions[actionKey].paused = false
    })
  }, [actions])

  const pauseAllActions = useCallback(() => {
    Object.keys(actions).forEach((actionKey) => {
      actions[actionKey].paused = true
    })
  }, [actions])

  const setAllWeight = useCallback((weight) => {
    Object.keys(actions).forEach((actionKey) => {
      setWeight(actions[actionKey], weight)
    })
  }, [actions])

  const setWeight = (action, weight) => {
    action.enabled = true
    action.setEffectiveTimeScale(1)
    action.setEffectiveWeight(weight)
  }

  const executeCrossFade = useCallback((startAction, endAction, duration) => {
    setWeight(endAction, 1)
    endAction.time = 0
    if (startAction) {
      startAction.crossFadeTo(endAction, duration, true)
    }
  }, [])

  const synchronizeCrossFade = useCallback((startAction, endAction, duration) => {
    const onLoopFinished = (event) => {
      if (event.action === startAction || !startAction) {
        mixer.removeEventListener('loop', onLoopFinished)
        executeCrossFade(startAction, endAction, duration)
      }
    }

    if (mixer) {
      mixer.addEventListener('loop', onLoopFinished)
    }
  }, [executeCrossFade, mixer])

  const prepareCrossFade = useCallback((startAction, endAction, duration) => {
    unPauseAllActions()
    executeCrossFade(startAction, endAction, duration)
  }, [executeCrossFade, unPauseAllActions])

  const prepareSyncCrossFade = useCallback((startAction, endAction, duration) => {
    unPauseAllActions()
    synchronizeCrossFade(startAction, endAction, duration)
  }, [synchronizeCrossFade, unPauseAllActions])

  const playIdleAnimOnly = useCallback(() => {
    const idleAction = actions['Idle']
    if (!idleAction) {
      return
    }

    if (prevAction !== idleAction) {
      // customDebug().log('Character#playIdleAnimOnly')
      prepareSyncCrossFade(prevAction, idleAction, 0.3)
      setPrevAction(idleAction)
    }
  }, [actions, prepareSyncCrossFade, prevAction])

  const playWalkAnimOnly = useCallback(() => {
    const walkAction = actions['Walk']
    if (!walkAction) {
      return
    }

    if (prevAction !== walkAction) {
      // customDebug().log('Character#playWalkAnimOnly')
      prepareCrossFade(prevAction, walkAction, 0.3)
      setPrevAction(walkAction)
    }
  }, [actions, prepareCrossFade, prevAction])

  return modelScene && (
    <RigidBody
      ref={rigidBody}
      colliders={isQuit ? false : 'hull'}
      position={usersInitPos[index] || [0, 0, 0]}
      enabledRotations={[false, true, false]}
      linearDamping={DEFAULT_LINEAR_DAMPING}
      angularDamping={DEFAULT_ANGULAR_DAMPING}
    >
      <primitive
        object={modelScene}
        visible={!isQuit}
        scale={CHARACTER_SCALE}
        castShadow
      />
    </RigidBody>
  )
}


const quitPosVec3 = new THREE.Vector3(QUIT_ORIGIN_POS[0], QUIT_ORIGIN_POS[1], QUIT_ORIGIN_POS[2])
const tempObject = new THREE.Object3D()
