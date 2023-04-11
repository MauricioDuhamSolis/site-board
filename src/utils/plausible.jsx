import axios from 'axios'
import {customDebug} from './custom.debug'


export const getAggregate = async (siteId, period = 'month') => {
  const paramObj = {
    site_id: siteId,
    period,
    metrics: 'visitors,pageviews,bounce_rate,visit_duration',
  }
  try {
    const res = await getPlausible(paramObj)
    const aggregate = res.data.results
    return aggregate
  } catch (e) {
    customDebug().log('plausible#getPlausible: e: ', e)
  }
}

const getPlausible = async (paramObj) => {
  const paramArr = Object.keys(paramObj).map((paramKey) => `${paramKey}=${paramObj[paramKey]}`)
  const params = paramArr.join('&')
  const plausible = await axios.get(`https://plausible.io/api/v1/stats/aggregate?${params}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  })
  return plausible
}


const bearerToken = 'pPeqDWqWton3kYZAkbyPYY1HENzHwXncm31cGcAItivVgOGGbe4sLe8TRGxi-bdg'
