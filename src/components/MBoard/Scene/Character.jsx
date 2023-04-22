/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, {useCallback, useEffect, useRef, useState} from 'react'
import * as THREE from 'three'
import {useAnimations, useFBX, useGLTF} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import {RigidBody, vec3} from '@react-three/rapier'
import {useZustand} from '../../../store/useZustand'
import {AXIS_SIZE, CHARACTER_SCALE, DEFAULT_ANGULAR_DAMPING, DEFAULT_LINEAR_DAMPING, TOLERANCE_DISTANCE, WALKING_SPEED} from '../../../utils/constants'
import {assertDefined} from '../../../utils/custom.assert'
import {customDebug} from '../../../utils/custom.debug'


export const Character = ({index, url}) => {
  assertDefined(index, url)
  const {
    usersInitPos,
    usersDesPos,
    setIsSeeingBillboard,
    realtimeVisitors,
  } = useZustand()
  const [prevAction, setPrevAction] = useState(null)
  const [stopped, setStopped] = useState(null)
  const [isFirstMove, setIsFirstMove] = useState(true)

  // const fbx = useFBX(url)
  // const modelScene = fbx
  // const modelAnims = fbx.animations

  const gltf = useGLTF(url)
  const modelScene = gltf.scene
  const modelAnims = gltf.animations

  // customDebug().log('Character: modelScene: ', modelScene)
  // customDebug().log('Character: modelAnims: ', modelAnims)

  const rigidBody = useRef(null)
  const {ref, actions, mixer} = useAnimations(modelAnims)


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

    if (prevAction !== idleAction) {
      // customDebug().log('Character#playIdleAnimOnly')
      prepareSyncCrossFade(prevAction, idleAction, 0.3)
      setPrevAction(idleAction)
    }
  }, [actions, prepareSyncCrossFade, prevAction])

  const playWalkAnimOnly = useCallback(() => {
    const walkAction = actions['Walk']

    if (prevAction !== walkAction) {
      // customDebug().log('Character#playWalkAnimOnly')
      prepareCrossFade(prevAction, walkAction, 0)
      setPrevAction(walkAction)
    }
  }, [actions, prepareCrossFade, prevAction])


  // Call at once
  useEffect(() => {
    // customDebug().log('Character: call at once')

    // Play idle animation at first
    mixer.timeScale = 1
    activateAllActions()
    setAllWeight(0)
    playIdleAnimOnly()
    modelScene.visible = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Move model to destination position
  useFrame((state, delta) => {
    if (rigidBody.current && usersDesPos[index]) {
      const curPos = vec3(rigidBody.current.translation())
      const userDesPos = usersDesPos[index]
      const desPos = new THREE.Vector3(userDesPos[0], userDesPos[1], userDesPos[2])
      const direc = desPos.sub(curPos)
      const direcLen = direc.length()
      const normalDirec = direc.normalize()
      const prevNormalDirec = rigidBody.current.userData?.prevNormalDirec
      const userData = {}

      if (prevNormalDirec) {
        const prevNormalNegateDirec = prevNormalDirec.negate()
        rigidBody.current.addForce(prevNormalNegateDirec, true)
      }

      if (direcLen > TOLERANCE_DISTANCE) {
        if (isFirstMove) {
          customDebug().log('Character#useFrame: character moving')
          playWalkAnimOnly()
          setIsFirstMove(false)
          modelScene.visible = true
        }

        rigidBody.current.addForce(normalDirec.multiplyScalar(WALKING_SPEED), true)
        userData.prevNormalDirec = normalDirec
        setStopped(false)
      } else if (!stopped) {
        customDebug().log('Character#useFrame: character stopped')
        playIdleAnimOnly()
        userData.prevNormalDirec = zeroVec3
        setIsSeeingBillboard(true)
        setStopped(true)
        setIsFirstMove(true)

        if (index > realtimeVisitors - 1) {
          customDebug().log('Character#useFrame: user terminated')
          modelScene.visible = false
        }
      }

      rigidBody.current.userData = userData
    }
  })

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
      >
        {/* <axesHelper args={[AXIS_SIZE]}/> */}
      </primitive>
    </RigidBody>
  )
}


const zeroVec3 = new THREE.Vector3()
