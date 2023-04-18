import React, {useCallback, useEffect} from 'react'
import {useZustand} from '../store/useZustand'
import {getAggregate, getRealtimeVisitors} from '../utils/plausible'
import {useControls} from 'leva'
import classNames from 'classnames'
import {REALTIME_DURATION} from '../utils/constants'


export const Dashboard = () => {
  const {
    selMenuIndex,
    menuArr,
    aggregate,
    setAggregate,
    setPlausibleStep,
    realtimeVisitors,
    setRealtimeVisitors,
  } = useZustand()

  const {showDashboard} = useControls({
    showDashboard: {value: true, label: 'Show Dashboard'},
  })

  const loadDashboardData = useCallback(async () => {
    if (isLoading) {
      return
    }
    isLoading = true

    if (selMenuIndex !== null) {
      const domain = menuArr[selMenuIndex]?.domain

      if (domain) {
        const newAggregate = await getAggregate(domain)
        setAggregate(newAggregate)

        if (newAggregate) {
          const valueArr = Object.keys(newAggregate).map((key) => newAggregate[key].value)
          const valuesSum = valueArr.reduce((a, b) => a + b, 0)
          if (!valuesSum) {
            setPlausibleStep(2)
          }
        }

        // eslint-disable-next-line no-unused-vars
        const newRealtimeVisitors = await getRealtimeVisitors(domain)
        // setRealtimeVisitors(newRealtimeVisitors)
        setRealtimeVisitors(4)
      }
    }

    isLoading = false
  }, [selMenuIndex, menuArr, setAggregate, setPlausibleStep, setRealtimeVisitors])

  useEffect(() => {
    loadDashboardData()
    setInterval((loadDashboardData), REALTIME_DURATION)
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
      <div className=''/>
    </div>
  )
}


let isLoading = false
