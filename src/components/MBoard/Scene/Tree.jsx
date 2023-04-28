/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React from 'react'
import {RigidBody} from '@react-three/rapier'
import {useCloneFbx} from '../../../hooks/useCloneFbx'
import {AXIS_SIZE, TREE_SCALE} from '../../../utils/constants'
import {assertDefined} from '../../../utils/custom.assert'


export const Tree = ({url, position, rotation}) => {
  assertDefined(url)
  const {modelScene} = useCloneFbx(url)

  return modelScene && (
    <RigidBody
      colliders='hull'
      position={position || [0, 0, 0]}
      rotation={rotation || [0, 0, 0]}
      enabledRotations={[false, true, false]}
    >
      <primitive
        object={modelScene}
        scale={TREE_SCALE}
        castShadow
      >
        {/* <axesHelper args={[AXIS_SIZE]}/> */}
      </primitive>
    </RigidBody>
  )
}
