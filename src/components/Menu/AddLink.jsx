/* eslint-disable no-unused-vars */
import React from 'react'
import classNames from 'classnames'
import {useZustand} from '../../store/useZustand'
import AddSvg from '../../assets/icons/add.svg'


export const AddLink = () => {
  return (
    <div className='h-full pt-1 pb-1'>
      <img
        className='h-full bg-white rounded-full cursor-pointer'
        src={AddSvg}
        alt='Add'
      />
    </div>
  )
}
