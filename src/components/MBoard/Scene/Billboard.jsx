import {useFBX} from '@react-three/drei'
import React, {useEffect} from 'react'
import {useZustand} from '../../../store/useZustand'
import {getDimensions} from '../../../utils/common'
import {BILLBOARD_SCALE, BILLBOARD_URL} from '../../../utils/constants'
import {customDebug} from '../../../utils/custom.debug'


export const Billboard = () => {
  const model = useFBX(BILLBOARD_URL)
  const {
    billboardInitPos,
    setBillboardDimensions,
  } = useZustand()

  useEffect(() => {
    const billboardDimensions = getDimensions(model)
    customDebug().log('Billboard#useEffect[model, setBillboardDimensions]: billboardDimensions: ', billboardDimensions)
    setBillboardDimensions(billboardDimensions)
  }, [model, setBillboardDimensions])

  return (
    <primitive
      object={model}
      position={billboardInitPos}
      rotation={[0, Math.PI, 0]}
      scale={BILLBOARD_SCALE}
    >
      {/* <axesHelper args={[AXIS_SIZE]}/> */}
    </primitive>
  )
}
