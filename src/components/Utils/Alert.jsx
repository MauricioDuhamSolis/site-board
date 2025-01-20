import classNames from 'classnames'
import React from 'react'
import {useZustand} from '../../store/useZustand'


export const Alert = () => {
  const {
    alertMsg, setAlertMsg,
  } = useZustand()

  return (
    <div className={classNames({
      'fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen': true,
      'hidden': !alertMsg,
    })}
    >
      <div className='flex flex-col items-center justify-center w-2/5 gap-4 p-4 text-white bg-black border border-white rounded h-2/5'>
        {alertMsg}
        <button
          className='pl-2 pr-2 border-2 rounded'
          onClick={() => setAlertMsg('')}
        >
          Ok
        </button>
      </div>
      <div className='' />
    </div>
  )
}
