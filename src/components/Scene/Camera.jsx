import React from 'react'
import {PerspectiveCamera} from '@react-three/drei'
import * as THREE from 'three'
import {useFrame} from '@react-three/fiber'
import {useZustand} from '../../store/useZustand'
import {FRAME} from '../../utils/constants'


export const Camera = () => {
  const {
    cameraInitPos,
    cameraDesPos,
    billboardDesPos,
    enableOrbitControls,
    billboardDimensions,
  } = useZustand()

  useFrame((state, delta) => {
    if (!billboardDimensions || enableOrbitControls) {
      return
    }
    const {height} = billboardDimensions
    cameraInitPosVec3.set(cameraInitPos[0], cameraInitPos[1], cameraInitPos[2])
    cameraDesPosVec3.set(cameraDesPos[0], cameraDesPos[1] + (height / 4), cameraDesPos[2])
    billboardDesPosVec3.set(billboardDesPos[0], billboardDesPos[1] + (height / 4), billboardDesPos[2])
    const distance = cameraInitPosVec3.distanceTo(cameraDesPosVec3)
    const alpha = distance / FRAME
    state.camera.position.lerp(cameraDesPosVec3, alpha)
    state.camera.lookAt(billboardDesPosVec3)
  })

  return (
    <PerspectiveCamera
      makeDefault
      position={cameraInitPos}
    />
  )
}


const cameraInitPosVec3 = new THREE.Vector3()
const cameraDesPosVec3 = new THREE.Vector3()
const billboardDesPosVec3 = new THREE.Vector3()
