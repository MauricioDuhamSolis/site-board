

import React from 'react'
import classNames from 'classnames'
import {useZustand} from '../../store/useZustand'


export const Alert = () => {
  const {
    alertMsg, setAlertMsg,
  } = useZustand()

  return (
    <div className={classNames({
      'fixed flex items-center justify-center w-screen h-screen top-0 left-0': true,
      'hidden': !alertMsg,
    })}
    >
      <div className='flex flex-col items-center justify-center w-3/5 gap-4 p-4 text-white bg-black border border-white rounded h-3/5'>
        {alertMsg}
        <button
          className='pl-2 pr-2 border-2 rounded'
          onClick={() => setAlertMsg('')}
        >
          Ok
        </button>
      </div>
    </div>
  )
}
