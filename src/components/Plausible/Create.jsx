/* eslint-disable no-unused-vars */
import React from 'react'
import classNames from 'classnames'
import {useZustand} from '../../store/useZustand'


export const Create = () => {
  const {nextPlausibleStep} = useZustand()

  return (
    <>
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
        Enter
      </button>
    </>
  )
}
