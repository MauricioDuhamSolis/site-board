import React, {useEffect} from 'react'
import {useZustand} from '../store/useZustand'
import {customDebug} from '../utils/custom.debug'
import {getAggregate} from '../utils/plausible'


export const Dashboard = () => {
  const {
    selMenuIndex,
    menuArr,
    setDashboardData,
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
        }
      }

      isLoading = false
    })()
  }, [menuArr, selMenuIndex, setDashboardData])

  return (
    <div className='fixed p-2 bg-white top-16 left-2'>
      Dashboard
    </div>
  )
}


let isLoading = false
