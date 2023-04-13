import axios from 'axios'
import {BACKEND_URL} from './constants'
import {assertDefined} from './custom.assert'
import {customDebug} from './custom.debug'


export const saveData = async (data) => {
  try {
    assertDefined(data)
    const saveUrl = data._id ? `${BACKEND_URL}/update/${data._id}` : `${BACKEND_URL}/add`
    delete data._id
    const res = await axios.post(saveUrl, data)
    return res
  } catch (e) {
    customDebug().log('mongo.db#saveData: e: ', e)
  }
}


export const getData = async (id) => {
  // TODO
}


export const getAllData = async () => {
  // TODO
}


export const removeData = async (id) => {
  // TODO
}


export const removeAllData = async () => {
  // TODO
}
