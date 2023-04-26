/* eslint-disable react/no-unknown-property */
import React from 'react'
import * as THREE from 'three'
import {Box} from '@react-three/drei'
import {useLoader} from '@react-three/fiber'
import {RigidBody} from '@react-three/rapier'
import {GROUND_HEIGHT, GROUND_SIZE} from '../../../utils/constants'
import groundImg from '../../../assets/texture/ground1.png'


export const Ground = () => {
  const groundTexture = useLoader(THREE.TextureLoader, groundImg)
  groundTexture.wrapS = THREE.RepeatWrapping
  groundTexture.wrapT = THREE.RepeatWrapping
  groundTexture.repeat.set(50, 50)

  return (
    <RigidBody enabledTranslations={[false, false, false]}>
      <Box
        args={[GROUND_SIZE, GROUND_HEIGHT, GROUND_SIZE]}
        position={[0, -GROUND_HEIGHT / 2, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          side={THREE.DoubleSide}
          map={groundTexture}
        />
      </Box>
    </RigidBody>
  )
}
