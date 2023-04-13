/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import classNames from 'classnames'
import {useZustand} from '../../store/useZustand'


export const Confirm = () => {
  const {
    confirmMsg, confirmFunc, onConfirm,
  } = useZustand()

  return (
    <div className={classNames({
      'absolute flex items-center justify-center w-screen h-screen': true,
      'hidden': !confirmFunc,
    })}
    >
      <div className='flex flex-col items-center gap-4 p-4 bg-gray-600 border border-white rounded justify-evenly max-w-max'>
        <div className='flex items-center justify-center text-white'>{confirmMsg ? confirmMsg : 'Would you like to proceed?'}</div>
        <div className='flex items-center justify-center w-full gap-4'>
          <div
            className='flex items-center px-2 text-white bg-red-500 rounded cursor-pointer'
            onClick={() => {
              confirmFunc()
              onConfirm()
            }}
          >
            Ok
          </div>
          <div
            className='flex items-center px-2 text-white bg-green-500 rounded cursor-pointer'
            onClick={() => onConfirm()}
          >
            Cancel
          </div>
        </div>
      </div>
      <div className=''/>
    </div>
  )
}
