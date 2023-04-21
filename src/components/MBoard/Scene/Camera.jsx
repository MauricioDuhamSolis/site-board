/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React from 'react'
import * as THREE from 'three'
import {PerspectiveCamera} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'
import {useZustand} from '../../../store/useZustand'
import {CAMERA_INIT_POS, LERP_ALPHA, TOLERANCE_DISTANCE} from '../../../utils/constants'
import {customDebug} from '../../../utils/custom.debug'


export const Camera = () => {
  const {
    cameraInitPos,
    cameraDesPos,
    billboardDesPos,
    billboardDimensions,
  } = useZustand()

  // useFrame((state, delta) => {
  //   if (!billboardDimensions) {
  //     return
  //   }
  //   const {height} = billboardDimensions
  //   cameraDesPosVec3.set(cameraDesPos[0], cameraDesPos[1] + (height / 2), cameraDesPos[2])
  //   billboardDesPosVec3.set(billboardDesPos[0], billboardDesPos[1] + (height / 2), billboardDesPos[2])
  //   state.camera.position.lerp(cameraDesPosVec3, LERP_ALPHA)
  //   state.camera.lookAt(billboardDesPosVec3)
  //   const distance = cameraDesPosVec3.sub(state.camera.position).length()

  //   if (distance > TOLERANCE_DISTANCE) {
  //     customDebug().log('Camera#useFrame: camera moving')
  //     stopped = false
  //   } else if (!stopped) {
  //     customDebug().log('Camera#useFrame: camera stopped')
  //     cameraCurPosVec3.copy(state.camera.position)
  //     stopped = true
  //   }
  // })

  return (
    <PerspectiveCamera
      makeDefault
      position={cameraInitPos}
    />
  )
}


const cameraCurPosVec3 = new THREE.Vector3(CAMERA_INIT_POS[0], CAMERA_INIT_POS[1], CAMERA_INIT_POS[2])
const cameraDesPosVec3 = new THREE.Vector3()
const billboardDesPosVec3 = new THREE.Vector3()
let stopped = true
