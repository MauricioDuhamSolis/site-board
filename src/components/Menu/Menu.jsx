/* eslint-disable no-unused-vars */
import React from 'react'
import classNames from 'classnames'
import {useZustand} from '../../store/useZustand'
import {MenuItem} from './MenuItem'
import {AddLink} from './AddLink'


export const Menu = () => {
  return (
    <div className='absolute top-0 flex w-screen h-12 gap-2 p-2 pb-0 bg-black border-0 border-b-2 border-red-500'>
      <MenuItem/>
      <MenuItem/>
      <AddLink/>
    </div>
  )
}
