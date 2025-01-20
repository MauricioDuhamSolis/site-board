import {PerspectiveCamera} from '@react-three/drei'
import React from 'react'
import {useZustand} from '../../../store/useZustand'


export const Camera = () => {
  const {
    cameraInitPos,
  } = useZustand()

  return (
    <PerspectiveCamera
      makeDefault
      position={cameraInitPos}
    />
  )
}
