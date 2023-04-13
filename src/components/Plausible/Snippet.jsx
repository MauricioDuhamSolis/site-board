import React from 'react'
// eslint-disable-next-line no-unused-vars
import classNames from 'classnames'
import {useZustand} from '../../store/useZustand'


export const Snippet = () => {
  const {nextPlausibleStep} = useZustand()

  return (
    <>
      <div>Code Snippet</div>
      <input
        className='w-3/5 text-black rounded'
        type='text'
      />
      <button
        className='pl-2 pr-2 border-2 rounded'
        onClick={() => {
          nextPlausibleStep()
        }}
      >
        Verify
      </button>
    </>
  )
}
