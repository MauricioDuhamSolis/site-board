/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import classNames from 'classnames'
import {useZustand} from '../../store/useZustand'


export const Alert = () => {
  const {
    alertMsg, setAlertMsg,
  } = useZustand()

  return (
    <div className={classNames({
      'absolute flex items-center justify-center w-screen h-screen': true,
      'hidden': !alertMsg,
    })}
    >
      <div className='z-10 flex flex-col items-center gap-4 p-4 bg-gray-600 border border-white rounded max-w-max justify-evenly'>
        <div className='flex items-center justify-center text-white ${true ? "test" : "none"}'>{alertMsg}</div>
        <div className='flex items-center justify-center w-full gap-4'>
          <div
            className='flex items-center px-2 text-white bg-green-500 rounded cursor-pointer'
            onClick={() => setAlertMsg('')}
          >
            Ok
          </div>
        </div>
      </div>
      <div className=''/>
    </div>
  )
}
