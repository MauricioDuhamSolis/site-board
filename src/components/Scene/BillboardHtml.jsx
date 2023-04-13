import React from 'react'
import {Html} from '@react-three/drei'


export const BillboardHtml = () => {
  return (
    <group>
      <Html transform>
        <div style={{
          width: 400,
          height: 100,
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
