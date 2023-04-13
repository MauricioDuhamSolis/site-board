import React, {useEffect} from 'react'
import {useFBX} from '@react-three/drei'
import {RigidBody} from '@react-three/rapier'
// eslint-disable-next-line no-unused-vars
import {BILLBOARD_SCALE, BILLBOARD_URL, GROUND_SIZE} from '../../utils/constants'
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
    isSeeingBillboard,
  } = useZustand()

  useEffect(() => {
    const billboardDimensions = getDimensions(model)
    customDebug().log('Billboard#useEffect: billboardDimensions: ', billboardDimensions)
    setBillboardDimensions(billboardDimensions)
  }, [model, setBillboardDimensions])

  const bind = useGesture({
    onPointerDown: (state) => {
      const {event} = state

      if (event.button === 0 && !isSeeingBillboard) { // Left
        const {point} = event
        const newUserCurPos = [point.x, 0, point.z - 0.5]
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
      <primitive
        // eslint-disable-next-line react/no-unknown-property
        object={model}
        scale={BILLBOARD_SCALE}
      >
        {/* <axesHelper args={[GROUND_SIZE / BILLBOARD_SCALE]}/> */}
      </primitive>
    </RigidBody>
  )
}
