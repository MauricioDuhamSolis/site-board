import React from 'react'
import classNames from 'classnames'
import {useZustand} from '../../store/useZustand'
import {Create} from './Create'
import {Snippet} from './Snippet'
import {Close} from './Close'


export const Plausible = () => {
  const {plausibleStep} = useZustand()

  return (
    <div className={classNames({
      'fixed top-0 left-0 flex items-center justify-center w-screen h-screen': true,
      'hidden': plausibleStep === 0,
    })}
    >
      <div className='relative flex flex-col items-center justify-center w-3/5 gap-4 text-white bg-black border border-white rounded h-3/5'>
        <Close/>
        {plausibleStep === 1 && <Create/>}
        {plausibleStep === 2 && <Snippet/>}
      </div>
    </div>
  )
}
