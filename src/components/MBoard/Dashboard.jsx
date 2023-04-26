import React, {useCallback, useEffect} from 'react'
import {useControls} from 'leva'
import classNames from 'classnames'
import {useZustand} from '../../store/useZustand'
import {getAggregate, getRealtimeVisitors} from '../../utils/plausible'
import {REALTIME_DURATION, IS_DEV_MODE, MAX_CHARACTER_NUM} from '../../utils/constants'
import {customDebug} from '../../utils/custom.debug'


export const Dashboard = () => {
  const {
    selMenuIndex,
    menuArr,
    aggregate,
    setAggregate,
    setPlausibleStep,
    realtimeVisitors,
    setRealtimeVisitors,
    isBackgroundLoading,
    setIsBackgroundLoading,
  } = useZustand()

  const {showDashboard} = useControls({
    showDashboard: {value: true, label: 'Show Dashboard'},
  })

  const loadDashboardData = useCallback(async () => {
    if (isBackgroundLoading) {
      return
    }
    setIsBackgroundLoading(true)

    if (selMenuIndex !== null) {
      if (IS_DEV_MODE) {
        const newRealtimeVisitors = parseInt(Math.random() * (MAX_CHARACTER_NUM - 1)) + 1
        // customDebug().log('Dashboard#loadDashboardData: newRealtimeVisitors: ', newRealtimeVisitors)
        setRealtimeVisitors(newRealtimeVisitors)
      } else {
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
      }
    }

    setIsBackgroundLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selMenuIndex, setRealtimeVisitors, menuArr, setAggregate, setPlausibleStep])

  useEffect(() => {
    loadDashboardData()
    if (intervalId) {
      clearInterval(intervalId)
    }
    intervalId = setInterval(loadDashboardData, REALTIME_DURATION)
  }, [loadDashboardData])

  return (
    <div className={classNames({
      'absolute z-10 p-2 bg-white border-2 border-gray-500 rounded top-3 left-2': true,
      'hidden': !showDashboard || !realtimeVisitors,
    })}
    >
      <div>Current Visitors: {realtimeVisitors}</div>
      <div>Bounce Rate: {aggregate?.bounce_rate?.value}</div>
      <div>Page Views: {aggregate?.pageviews?.value}</div>
      <div>Visit Duration: {aggregate?.visit_duration?.value}</div>
      <div>Visitors: {aggregate?.visitors?.value}</div>
    </div>
  )
}


let intervalId
