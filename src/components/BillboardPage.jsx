import React from 'react'
import {useControls} from 'leva'
import classNames from 'classnames'
import {useZustand} from '../store/useZustand'
import {domainToUrl} from '../utils/common'


export const BillboardPage = () => {
  const {
    selMenuIndex,
    menuArr,
  } = useZustand()

  const {fullScreen} = useControls({
    fullScreen: {value: false, label: 'Full Screen'},
  })

  const billboardDomain = menuArr[selMenuIndex]?.domain

  return (
    <div
      className={classNames({
        'absolute z-10 w-full h-full bg-black rounded': true,
        'hidden': !fullScreen,
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
    </div>
  )
}
