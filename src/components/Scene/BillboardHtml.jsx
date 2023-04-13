import React from 'react'
import {Html} from '@react-three/drei'
import {BILLBOARD_HTML_SIZE} from '../../utils/constants'


export const BillboardHtml = () => {
  return (
    <group>
      <Html transform>
        <div style={{
          width: BILLBOARD_HTML_SIZE,
          height: BILLBOARD_HTML_SIZE,
          color: 'white',
          border: '1px solid red',
        }}
        >
          BillboardHtml
        </div>
      </Html>
    </group>
  )
}
