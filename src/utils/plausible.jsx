import Plausible from 'plausible-api'
import {customDebug} from './custom.debug'


export const getPlausible = async (
    siteId,
    period = 'month', // "12mo" | "6mo" | "30d" | "7d" | "month" | "day"
) => {
  customDebug().log('plausible#getPlausible: siteId: ', siteId)
  const plausible = await client.aggregate(
      siteId,
      period,
      [
        'visitors',
        'pageviews',
        'bounce_rate',
        'visit_duration',
      ],
  )
  customDebug().log('plausible#getPlausible: plausible: ', plausible)
}


const client = new Plausible('OmaOB2Q0ifZeGeDIPJBY1ja77rp7HHOcUDGWJzyKozKS4PqocplEGH4MDHpXddhu')
customDebug().log('plausible: client: ', client)
