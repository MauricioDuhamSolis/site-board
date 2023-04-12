/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react'
import classNames from 'classnames'
import {useZustand} from '../../store/useZustand'
import {MenuItem} from './MenuItem'
import {AddLink} from './AddLink'
import {customDebug} from '../../utils/custom.debug'
import {createSite, getAggregate, getRealtimeVisitors, getSite, getTimeseries} from '../../utils/plausible'


export const Menu = () => {
  // useEffect(() => {
  //   (async () => {
  //     if (isLoading) {
  //       return
  //     }
  //     isLoading = true
  //     customDebug().log('Menu#useEffect')
  //     const aggregate = await getAggregate('mboard.onrender.com')
  //     customDebug().log('Menu#useEffect: aggregate: ', aggregate)
  //     const realtimeVisitors = await getRealtimeVisitors('mboard.onrender.com')
  //     customDebug().log('Menu#useEffect: realtimeVisitors: ', realtimeVisitors)
  //     const timeseries = await getTimeseries('mboard.onrender.com')
  //     customDebug().log('Menu#useEffect: timeseries: ', timeseries)
  //     const createSiteRes = await createSite('bookingsite.mes', 'Europe/London')
  //     customDebug().log('Menu#useEffect: createSiteRes: ', createSiteRes)
  //     const site = await getSite('mboard.onrender.com')
  //     customDebug().log('Menu#useEffect: site: ', site)
  //     isLoading = false
  //   })()
  // }, [])

  return (
    <div className='absolute top-0 flex w-screen h-12 gap-2 p-2 pb-0 bg-black border-0 border-b-2 border-white'>
      <MenuItem/>
      <MenuItem/>
      <AddLink/>
    </div>
  )
}


// eslint-disable-next-line prefer-const
let isLoading = false
