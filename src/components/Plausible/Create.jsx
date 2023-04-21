import React, {useRef} from 'react'
import {useZustand} from '../../store/useZustand'
import {createSite} from '../../utils/plausible'
import {saveData} from '../../utils/mongo.db'
import {customDebug} from '../../utils/custom.debug'
import {urlToDomain} from '../../utils/common'
import {useAuth0} from '@auth0/auth0-react'


export const Create = ({domain}) => {
  const {
    nextPlausibleStep,
    setAlertMsg,
    menuArr,
    addMenu,
    setSelMenuIndex,
    onConfirm,
  } = useZustand()
  const {user} = useAuth0()
  const inputRef = useRef(null)

  return (
    <>
      <input
        className='w-3/5 p-1 text-black rounded'
        ref={inputRef}
        type='text'
        value={domain}
      />
      <button
        className='pl-2 pr-2 border-2 rounded'
        onClick={() => onConfirm(async () => {
          if (!user?.name) {
            setAlertMsg('Username not correct.')
            return
          }

          const inputVal = inputRef.current.value
          const urlDomain = urlToDomain(inputVal)
          customDebug().log('Create#onConfirm: urlDomain: ', urlDomain)

          if (!urlDomain) {
            setAlertMsg('Input correct domain please.')
            return
          }

          const createSiteRes = await createSite(urlDomain)
          customDebug().log('Create#onConfirm: createSiteRes: ', createSiteRes)
          const siteData = createSiteRes?.data

          if (siteData?.domain !== urlDomain) {
            setAlertMsg('This domain cannot be registered. Perhaps one of your colleagues registered it? If that\'s not the case, please contact support@plausible.io')
            return
          }

          siteData.username = user.name
          const saveDataRes = await saveData(siteData)
          customDebug().log('Create#onConfirm: saveDataRes: ', saveDataRes)
          const insertedId = saveDataRes?.data?.insertedId

          if (saveDataRes?.status !== 200 || !insertedId) {
            setAlertMsg('Backend is disconnected. Check your internet connection.')
            return
          }

          siteData._id = insertedId
          setSelMenuIndex(menuArr.length)
          addMenu(siteData)
          nextPlausibleStep()
        })}
      >
        Enter
      </button>
    </>
  )
}
