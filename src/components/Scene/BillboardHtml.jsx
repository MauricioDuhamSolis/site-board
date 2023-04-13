import React from 'react'
import {Html} from '@react-three/drei'
import {BILLBOARD_HTML_SIZE} from '../../utils/constants'
import {useZustand} from '../../store/useZustand'
import classNames from 'classnames'


export const BillboardHtml = () => {
  const {
    billboardDesPos,
    billboardDimensions,
    isSeeingBillboard,
  } = useZustand()

  const halfHeight = billboardDimensions.height * 0.545
  const htmlPos = [billboardDesPos[0], billboardDesPos[1] + halfHeight, billboardDesPos[2] - 0.2]

  return (
    <Html
      transform
      position={htmlPos}
      rotation={[0, Math.PI, 0]}
      zIndexRange={[0, 0]}
    >
      <div
        className={classNames({
          'p-1 text-red-500 bg-yellow-500 rounded': true,
          'hidden': !isSeeingBillboard,
        })}
        style={{
          width: BILLBOARD_HTML_SIZE,
          height: BILLBOARD_HTML_SIZE,
        }}
      >
        BillboardHtml
      </div>
    </Html>
  )
}
