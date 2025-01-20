import {RigidBody} from '@react-three/rapier'
import React from 'react'
import {useCloneFbx} from '../../../hooks/useCloneFbx'
import {LAND_INIT_POS, LAND_SCALE} from '../../../utils/constants'


export const Land = () => {
  const {modelScene} = useCloneFbx('./models/fbx/lands/L5.fbx')

  return modelScene && (
    <RigidBody
      colliders='hull'
      position={LAND_INIT_POS}
      enabledRotations={[false, true, false]}
      enabledTranslations={[false, false, false]}
    >
      <primitive
        object={modelScene}
        scale={LAND_SCALE}
        castShadow
      >
        {/* <axesHelper args={[AXIS_SIZE]}/> */}
      </primitive>
    </RigidBody>
  )
}
