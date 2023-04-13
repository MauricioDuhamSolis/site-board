/* eslint-disable react/no-unknown-property */
import React, {useEffect} from 'react'
import {useFBX} from '@react-three/drei'
import {RigidBody} from '@react-three/rapier'
import {BILLBOARD_URL, CHARACTER_SCALE} from '../../utils/constants'
import {useGesture} from '@use-gesture/react'
import {useZustand} from '../../store/useZustand'
import {getDimensions} from '../../utils/common'
import {customDebug} from '../../utils/custom.debug'


export const Billboard = () => {
  const model = useFBX(BILLBOARD_URL)
  const {
    selUserIndex,
    setUserDesPos,
    billboardInitPos,
    setBillboardDimensions,
  } = useZustand()

  useEffect(() => {
    const billboardDimensions = getDimensions(model)
    customDebug().log('Billboard#useEffect: billboardDimensions: ', billboardDimensions)
    setBillboardDimensions(billboardDimensions)
  }, [model, setBillboardDimensions])

  const bind = useGesture({
    onPointerDown: (state) => {
      const {event} = state

      if (event.button === 0) { // Left
        const {point} = event
        const newUserCurPos = [point.x, -1, point.z - 0.5]
        setUserDesPos(selUserIndex, newUserCurPos)
      }
    },
  })

  return (
    <RigidBody
      position={billboardInitPos}
      rotation={[0, Math.PI, 0]}
      enabledRotations={[false, true, false]}
      {...bind()}
    >
      <primitive object={model} scale={CHARACTER_SCALE}/>
    </RigidBody>
  )
}
