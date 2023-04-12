import axios from 'axios'
import {customDebug} from './custom.debug'
import {assertDefined} from './custom.assert'


export const getRealtimeVisitors = async (siteId) => {
  assertDefined(siteId)
  const paramObj = {
    site_id: siteId,
  }
  const res = await getPlausible('stats/realtime/visitors', paramObj)
  const realtimeVisitors = res?.data
  return realtimeVisitors
}


export const getAggregate = async (siteId, period = 'month') => {
  assertDefined(siteId, period)
  const paramObj = {
    site_id: siteId,
    period,
    metrics: 'visitors,pageviews,bounce_rate,visit_duration',
  }
  const res = await getPlausible('stats/aggregate', paramObj)
  const aggregate = res?.data?.results
  return aggregate
}


export const getTimeseries = async (siteId, period = 'month') => {
  assertDefined(siteId, period)
  const paramObj = {
    site_id: siteId,
    period,
  }
  const res = await getPlausible('stats/timeseries', paramObj)
  const timeseries = res?.data?.results
  return timeseries
}


export const createSite = async (domain, timezone) => {
  assertDefined(domain, timezone)
  const paramObj = {domain, timezone}
  const res = await postPlausible('sites', paramObj)
  return res
}


export const getSite = async (domain) => {
  assertDefined(domain)
  const res = await getPlausible(`sites/${domain}`)
  return res
}


const getPlausible = async (path, paramObj = {}) => {
  assertDefined(path)

  try {
    const paramArr = Object.keys(paramObj).map((paramKey) => `${paramKey}=${paramObj[paramKey]}`)
    const params = paramArr.join('&')
    const res = await axios.get(
        `https://plausible.io/api/v1/${path}?${params}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        },
    )
    customDebug().log('plausible#getPlausible: res: ', res)
    return res
  } catch (e) {
    customDebug().log('plausible#getPlausible: e: ', e)
  }
}


const postPlausible = async (path, paramObj) => {
  assertDefined(path)

  try {
    const data = new URLSearchParams()
    Object.keys(paramObj).forEach((paramKey) => {
      data.append(paramKey, paramObj[paramKey])
    })
    const res = await axios.post(
        `https://plausible.io/api/v1/${path}`,
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${bearerToken}`,
          },
        },
    )
    customDebug().log('plausible#postPlausible: res: ', res)
    return res
  } catch (e) {
    customDebug().log('plausible#postPlausible: e: ', e)
  }
}


const bearerToken = 'KW_7BcV7amnosu5lmLByxFI3AtGcf2L0qWJBvYwxA1RgvQM-32b9t0tDHfw5liR6'
