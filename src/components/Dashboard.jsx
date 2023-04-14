import React, {useEffect} from 'react'
import {useZustand} from '../store/useZustand'
import {customDebug} from '../utils/custom.debug'
import {getAggregate} from '../utils/plausible'


export const Dashboard = () => {
  const {
    selMenuIndex,
    menuArr,
    dashboardData,
    setDashboardData,
    setPlausibleStep,
  } = useZustand()

  useEffect(() => {
    (async () => {
      if (isLoading) {
        return
      }
      isLoading = true

      if (selMenuIndex !== null) {
        const domain = menuArr[selMenuIndex]?.domain
        customDebug().log('Dashboard#useEffect: domain: ', domain)

        if (domain) {
          const aggregate = await getAggregate(domain)
          customDebug().log('Dashboard#useEffect: aggregate: ', aggregate)
          setDashboardData(aggregate)
          const valueArr = Object.keys(aggregate).map((key) => aggregate[key].value)
          customDebug().log('Dashboard#useEffect: valueArr: ', valueArr)
          const valuesSum = valueArr.reduce((a, b) => a + b, 0)
          customDebug().log('Dashboard#useEffect: valuesSum: ', valuesSum)
          if (!valuesSum) {
            setPlausibleStep(2)
          }
        }
      }

      isLoading = false
    })()
  }, [menuArr, selMenuIndex, setDashboardData, setPlausibleStep])

  return (
    <div className='fixed p-2 bg-white rounded top-16 left-2'>
      <div>Bounce Rate: {dashboardData?.bounce_rate?.value}</div>
      <div>Page Views: {dashboardData?.pageviews?.value}</div>
      <div>Visit Duration: {dashboardData?.visit_duration?.value}</div>
      <div>Visitors: {dashboardData?.visitors?.value}</div>
    </div>
  )
}


let isLoading = false
