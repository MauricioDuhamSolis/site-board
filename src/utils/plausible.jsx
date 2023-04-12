import axios from 'axios'
import {customDebug} from './custom.debug'
import {assertDefined} from './custom.assert'


export const getRealtimeVisitors = async (siteId) => {
  assertDefined(siteId)
  const paramObj = {
    site_id: siteId,
  }

  try {
    const res = await getPlausible('stats/realtime/visitors', paramObj)
    const realtimeVisitors = res.data
    return realtimeVisitors
  } catch (e) {
    customDebug().log('plausible#getRealtimeVisitors: e: ', e)
  }
}


export const getAggregate = async (siteId, period = 'month') => {
  assertDefined(siteId, period)
  const paramObj = {
    site_id: siteId,
    period,
    metrics: 'visitors,pageviews,bounce_rate,visit_duration',
  }

  try {
    const res = await getPlausible('stats/aggregate', paramObj)
    const aggregate = res.data.results
    return aggregate
  } catch (e) {
    customDebug().log('plausible#getAggregate: e: ', e)
  }
}


export const getTimeseries = async (siteId, period = 'month') => {
  assertDefined(siteId, period)
  const paramObj = {
    site_id: siteId,
    period,
  }

  try {
    const res = await getPlausible('stats/timeseries', paramObj)
    const timeseries = res.data.results
    return timeseries
  } catch (e) {
    customDebug().log('plausible#getTimeseries: e: ', e)
  }
}


export const createSite = async (domain, timezone) => {
  assertDefined(domain, timezone)
  const paramObj = {domain, timezone}

  try {
    const res = await postPlausible('sites', paramObj)
    return res
  } catch (e) {
    customDebug().log('plausible#createSite: e: ', e)
  }
}


export const getSite = async (domain) => {
  assertDefined(domain)

  try {
    const res = await getPlausible(`sites/${domain}`)
    return res
  } catch (e) {
    customDebug().log('plausible#getSite: e: ', e)
  }
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
    const plausible = await axios.post(
        `https://plausible.io/api/v1/${path}`,
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${bearerToken}`,
          },
        },
    )
    return plausible
  } catch (e) {
    customDebug().log('plausible#postPlausible: e: ', e)
  }
}


const bearerToken = 'N5MdxC0a6VU3zyySi2TOuXV41HA68e7R1vwnoTkz100cxLIJXF06eoLJkdcg4bp-'
