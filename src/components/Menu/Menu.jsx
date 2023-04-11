/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react'
import classNames from 'classnames'
import {useZustand} from '../../store/useZustand'
import {MenuItem} from './MenuItem'
import {AddLink} from './AddLink'
import {customDebug} from '../../utils/custom.debug'
import {getPlausible} from '../../utils/plausible'


export const Menu = () => {
  useEffect(() => {
    customDebug().log('Menu#useEffect')
    getPlausible('bookingsite.me')
  }, [])

  return (
    <div className='absolute top-0 flex w-screen h-12 gap-2 p-2 pb-0 bg-black border-0 border-b-2 border-red-500'>
      <MenuItem/>
      <MenuItem/>
      <AddLink/>
    </div>
  )
}
