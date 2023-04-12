/* eslint-disable react/no-unknown-property */
import React, {useEffect} from 'react'
import {useFBX} from '@react-three/drei'
import {RigidBody} from '@react-three/rapier'
import {BILLBOARD_URL} from '../../utils/constants'
import {useGesture} from '@use-gesture/react'
import {useZustand} from '../../store/useZustand'


export const Billboard = () => {
  const model = useFBX(BILLBOARD_URL)
  const {
    selUserIndex,
    setUserDesPos,
    billboardInitPos,
    setBillboardModel,
  } = useZustand()

  useEffect(() => {
    setBillboardModel(model)
  }, [model, setBillboardModel])

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
      <primitive object={model} scale={MODEL_SCALE}/>
    </RigidBody>
  )
}


const MODEL_SCALE = 0.015
