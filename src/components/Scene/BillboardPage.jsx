import React from 'react'
import {useZustand} from '../../store/useZustand'
import {getDomainUrl} from '../../utils/common'


export const BillboardPage = () => {
  const {
    selMenuIndex,
    menuArr,
  } = useZustand()

  const billboardDomain = menuArr[selMenuIndex]?.domain

  return (
    <div className='absolute flex items-center justify-center w-full h-full'>
      {billboardDomain ?
          <iframe
            className='w-full h-full'
            src={getDomainUrl(billboardDomain)}
            title={billboardDomain}
          /> :
          <div>Page not exist.</div>
      }
    </div>
  )
}
