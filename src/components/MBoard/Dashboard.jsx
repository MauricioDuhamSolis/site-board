import classNames from 'classnames'
import {useControls} from 'leva'
import React, {useCallback, useEffect} from 'react'
import {useZustand} from '../../store/useZustand'
import {MAX_CHARACTER_CNT, REALTIME_DURATION, USE_PLAUSIBLE} from '../../utils/constants'
import {customDebug} from '../../utils/custom.debug'
import {getAggregate, getRealtimeVisitors} from '../../utils/plausible'


export const Dashboard = () => {
  const {
    selMenuIndex,
    menuArr,
    // aggregate,
    setAggregate,
    setPlausibleStep,
    realtimeVisitors,
    setRealtimeVisitors,
    isBackgroundLoading,
    setIsBackgroundLoading,
    isSeeingApp,
  } = useZustand()

  const {showDashboard} = useControls({
    showDashboard: {value: true, label: 'Show Dashboard'},
  })

  const loadDashboardData = useCallback(async () => {
    if (isBackgroundLoading || !isSeeingApp) {
      return
    }
    setIsBackgroundLoading(true)

    if (selMenuIndex !== null) {
      if (USE_PLAUSIBLE) {
        const domain = menuArr[selMenuIndex]?.domain

        if (domain) {
          const newAggregate = await getAggregate(domain)
          if (newAggregate) {
            setAggregate(newAggregate)
          }

          if (newAggregate) {
            const valueArr = Object.keys(newAggregate).map((key) => newAggregate[key].value)
            const valuesSum = valueArr.reduce((a, b) => a + b, 0)
            if (!valuesSum) {
              setPlausibleStep(2)
            }
          }

          const newRealtimeVisitors = await getRealtimeVisitors(domain)
          customDebug().log('Dashboard#loadDashboardData: newRealtimeVisitors: ', newRealtimeVisitors)
          if (newRealtimeVisitors !== undefined) {
            setRealtimeVisitors(newRealtimeVisitors)
          }
        }
      } else {
        setTimeout(() => {
          const newRealtimeVisitors = parseInt(Math.random() * (MAX_CHARACTER_CNT / 3)) + 1
          customDebug().log('Dashboard#loadDashboardData: newRealtimeVisitors: ', newRealtimeVisitors)
          setRealtimeVisitors(newRealtimeVisitors)
        }, 1000)
      }
    }

    setIsBackgroundLoading(false)
  }, [isBackgroundLoading, isSeeingApp, selMenuIndex, menuArr])

  useEffect(() => {
    if (!isSeeingApp || selMenuIndex === -1) {
      return
    }
    loadDashboardData()
    if (intervalId) {
      clearInterval(intervalId)
    }
    intervalId = setInterval(loadDashboardData, REALTIME_DURATION)
  }, [isSeeingApp, selMenuIndex])

  return (
    <div className={classNames({
      'absolute z-10 p-2 bg-black border-2 border-white rounded top-3 left-2 text-white': true,
      'hidden': !showDashboard || !realtimeVisitors,
    })}
    >
      <div>Current Visitors: {realtimeVisitors}</div>
      {/* <div>Bounce Rate: {aggregate?.bounce_rate?.value}</div>
      <div>Page Views: {aggregate?.pageviews?.value}</div>
      <div>Visit Duration: {aggregate?.visit_duration?.value}</div>
      <div>Visitors: {aggregate?.visitors?.value}</div> */}
    </div>
  )
}


let intervalId
