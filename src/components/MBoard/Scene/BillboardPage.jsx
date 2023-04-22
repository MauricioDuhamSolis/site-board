import React from 'react'
import classNames from 'classnames'
import {useZustand} from '../../../store/useZustand'
import {domainToUrl} from '../../../utils/common'


export const BillboardPage = ({hide}) => {
  const {
    selMenuIndex,
    menuArr,
  } = useZustand()

  const billboardDomain = menuArr[selMenuIndex]?.domain

  return (
    <div className={classNames({
      'absolute flex items-center justify-center w-full h-full text-white top-0 left-0 bg-black': true,
      'hidden': !!hide,
    })}
    >
      {billboardDomain ?
          <iframe
            className='w-full h-full'
            src={domainToUrl(billboardDomain)}
            title={billboardDomain}
          /> :
          <div>Page not exist.</div>
      }
      <div className=''/>
    </div>
  )
}
