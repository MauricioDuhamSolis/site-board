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
  try {
    assertDefined(id)
    const getUrl = `${BACKEND_URL}/${id}`
    const res = await axios.get(getUrl)
    return res?.data
  } catch (e) {
    customDebug().log('mongo.db#getData: e: ', e)
  }
}


export const getAllData = async () => {
  try {
    const getAllUrl = `${BACKEND_URL}/`
    const res = await axios.get(getAllUrl)
    return res?.data
  } catch (e) {
    customDebug().log('mongo.db#getAllData: e: ', e)
  }
}


export const removeData = async (id) => {
  try {
    assertDefined(id)
    const removeUrl = `${BACKEND_URL}/remove/${id}`
    const res = await axios.post(removeUrl)
    return res
  } catch (e) {
    customDebug().log('mongo.db#removeData: e: ', e)
  }
}


export const getUserData = async (username) => {
  try {
    assertDefined(username)
    const getUrl = `${BACKEND_URL}/getuserdata/${username}`
    const res = await axios.get(getUrl)
    return res?.data
  } catch (e) {
    customDebug().log('mongo.db#getUserData: e: ', e)
  }
}
