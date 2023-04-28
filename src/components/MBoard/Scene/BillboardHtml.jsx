import React from 'react'
import {Html} from '@react-three/drei'
import {BILLBOARD_HTML_SIZE} from '../../../utils/constants'
import {useZustand} from '../../../store/useZustand'
import {domainToUrl} from '../../../utils/common'


export const BillboardHtml = () => {
  const {
    billboardDesPos,
    billboardDimensions,
    selMenuIndex,
    menuArr,
  } = useZustand()

  const halfHeight = billboardDimensions.height * 0.545
  const htmlPos = [billboardDesPos[0], billboardDesPos[1] + halfHeight, billboardDesPos[2] - 0.2]
  const billboardDomain = menuArr[selMenuIndex]?.domain

  return (
    <Html
      transform
      position={htmlPos}
      rotation={[0, Math.PI, 0]}
      zIndexRange={[0, 0]}
      occlude='blending'
    >
      <div
        className='rounded'
        style={{
          width: BILLBOARD_HTML_SIZE,
          height: BILLBOARD_HTML_SIZE,
        }}
      >
        {billboardDomain ?
          <iframe
            className='w-full h-full'
            src={domainToUrl(billboardDomain)}
            title={billboardDomain}
          /> :
          <div className='flex items-center justify-center w-full h-full text-black text-8xl'>Page not exist.</div>
        }
      </div>
    </Html>
  )
}
