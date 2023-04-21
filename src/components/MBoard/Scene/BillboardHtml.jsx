import React from 'react'
import {Html} from '@react-three/drei'
import classNames from 'classnames'
import {BillboardPage} from './BillboardPage'
import {BILLBOARD_HTML_SIZE} from '../../../utils/constants'
import {useZustand} from '../../../store/useZustand'


export const BillboardHtml = ({hide}) => {
  const {
    billboardDesPos,
    billboardDimensions,
  } = useZustand()

  const halfHeight = billboardDimensions.height * 0.545
  const htmlPos = [billboardDesPos[0], billboardDesPos[1] + halfHeight, billboardDesPos[2] - 0.1]

  return (
    <Html
      transform
      position={htmlPos}
      rotation={[0, Math.PI, 0]}
      zIndexRange={[0, 0]}
      occlude='blending'
    >
      <div
        className={classNames({
          'relative flex items-center justify-center text-white rounded': true,
          'hidden': !!hide,
        })}
        style={{
          width: BILLBOARD_HTML_SIZE,
          height: BILLBOARD_HTML_SIZE,
        }}
      >
        <BillboardPage/>
      </div>
    </Html>
  )
}
