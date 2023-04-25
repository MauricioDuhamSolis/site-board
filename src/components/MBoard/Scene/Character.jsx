/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, {useCallback, useEffect, useRef, useState} from 'react'
import * as THREE from 'three'
import {useFrame} from '@react-three/fiber'
import {RigidBody, vec3} from '@react-three/rapier'
import {useZustand} from '../../../store/useZustand'
import {CHARACTER_SCALE, DEFAULT_ANGULAR_DAMPING, DEFAULT_LINEAR_DAMPING, TOLERANCE_DISTANCE, WALKING_SPEED} from '../../../utils/constants'
import {assertDefined} from '../../../utils/custom.assert'
import {customDebug} from '../../../utils/custom.debug'
import {useCloneGltf} from '../../../hooks/useCloneGltf'


export const Character = ({index, url}) => {
  assertDefined(index, url)
  const {
    usersInitPos,
    usersDesPos,
    realtimeVisitors,
  } = useZustand()
  const [prevAction, setPrevAction] = useState(null)
  const [stopped, setStopped] = useState(null)
  const [isFirstMove, setIsFirstMove] = useState(true)

  const rigidBody = useRef(null)
  const {modelScene, ref, actions, mixer} = useCloneGltf(url)

  // const fbx = useFBX(url)
  // const modelScene = fbx
  // const modelAnims = fbx.animations

  useEffect(() => {
    if (!mixer) {
      return
    }

    // Play idle animation at first
    mixer.timeScale = 1
    activateAllActions()
    setAllWeight(0)
    playIdleAnimOnly()
    modelScene.visible = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mixer])

  // Move model to destination position
  useFrame((state, delta) => {
    if (rigidBody.current && usersDesPos[index]) {
      const curPos = vec3(rigidBody.current.translation())
      const userDesPos = usersDesPos[index]
      const desPos = new THREE.Vector3(userDesPos[0], userDesPos[1], userDesPos[2])
      const direc = desPos.sub(curPos)
      const direcLen = direc.length()
      const normalDirec = direc.normalize()
      normalDirec.setY(0)

      if (direcLen > TOLERANCE_DISTANCE) {
        if (isFirstMove) {
          customDebug().log('Character#useFrame: character moving')
          playWalkAnimOnly()
          setIsFirstMove(false)
          setStopped(false)
        }

        if (index < realtimeVisitors) {
          modelScene.visible = true
        }
        rigidBody.current.applyImpulse(normalDirec.multiplyScalar(WALKING_SPEED), true)
      } else if (!stopped) {
        customDebug().log('Character#useFrame: character stopped')
        playIdleAnimOnly()
        setIsFirstMove(true)
        setStopped(true)
        if (index > realtimeVisitors - 1) {
          modelScene.visible = false
        }
      }
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

    mixer.addEventListener('loop', onLoopFinished)
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
    customDebug().log('Character#playIdleAnimOnly: idleAction: ', idleAction)
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
    customDebug().log('Character#playIdleAnimOnly: walkAction: ', walkAction)
    if (!walkAction) {
      return
    }

    if (prevAction !== walkAction) {
      // customDebug().log('Character#playWalkAnimOnly')
      prepareCrossFade(prevAction, walkAction, 0.3)
      setPrevAction(walkAction)
    }
  }, [actions, prepareCrossFade, prevAction])

  return (
    <RigidBody
      ref={rigidBody}
      position={usersInitPos[index]}
      enabledRotations={[false, true, false]}
      linearDamping={DEFAULT_LINEAR_DAMPING}
      angularDamping={DEFAULT_ANGULAR_DAMPING}
    >
      <primitive
        ref={ref}
        object={modelScene}
        scale={CHARACTER_SCALE}
        castShadow
      />
    </RigidBody>
  )
}
