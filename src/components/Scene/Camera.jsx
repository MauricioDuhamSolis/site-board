import React from 'react'
import {PerspectiveCamera} from '@react-three/drei'
import * as THREE from 'three'
import {useFrame} from '@react-three/fiber'
import {useZustand} from '../../store/useZustand'
import {LERP_ALPHA, TOLERANCE_DISTANCE} from '../../utils/constants'
import {customDebug} from '../../utils/custom.debug'


export const Camera = () => {
  const {
    cameraInitPos,
    cameraDesPos,
    billboardDesPos,
    isSeeingBillboard,
    billboardDimensions,
  } = useZustand()

  useFrame((state, delta) => {
    if (!billboardDimensions || !isSeeingBillboard) {
      return
    }
    const {height} = billboardDimensions
    const cameraCurPosVec3 = state.camera.position
    cameraDesPosVec3.set(cameraDesPos[0], cameraDesPos[1] + (height / 2), cameraDesPos[2])
    billboardDesPosVec3.set(billboardDesPos[0], billboardDesPos[1] + (height / 2), billboardDesPos[2])
    state.camera.position.lerp(cameraDesPosVec3, LERP_ALPHA)
    state.camera.lookAt(billboardDesPosVec3)
    const distance = cameraDesPosVec3.sub(cameraCurPosVec3).length()
    if (distance > TOLERANCE_DISTANCE) {
      customDebug().log('Camera#useFrame: camera moving')
    } else {
      customDebug().log('Camera#useFrame: camera stopped')
    }
  })

  return (
    <PerspectiveCamera
      makeDefault
      position={cameraInitPos}
    />
  )
}


// const cameraCurPosVec3 = new THREE.Vector3()
const cameraDesPosVec3 = new THREE.Vector3()
const billboardDesPosVec3 = new THREE.Vector3()
