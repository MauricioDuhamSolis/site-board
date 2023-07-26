/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import classNames from 'classnames'
import {useZustand} from '../../store/useZustand'
import CloseSvg from '../../assets/icons/close.svg'
import {customDebug} from '../../utils/custom.debug'
import {deleteSite} from '../../utils/plausible'
import {removeData} from '../../utils/mongo.db'
import {USE_PLAUSIBLE} from '../../utils/constants'


export const MenuItem = ({index, menu}) => {
  const {
    selMenuIndex,
    setSelMenuIndex,
    menuArr,
    deleteMenu,
    setAlertMsg,
    onConfirm,
  } = useZustand()

  return (
    <div className={classNames({
      'flex items-center justify-center gap-2 p-2 text-white border-2 border-b-0 rounded-tl rounded-tr cursor-pointer': true,
      'border-white': index === selMenuIndex,
      'border-gray-500': index !== selMenuIndex,
    })}
    >
      <div onClick={() => setSelMenuIndex(index)}>{menu.domain}</div>
      <img
        className='w-4 h-4 bg-white cursor-pointer'
        src={CloseSvg}
        alt='Close'
        onClick={() => onConfirm(async () => {
          if (!menu.domain || !menu._id) {
            setAlertMsg('Menu info is incorrect.')
            return
          }

          customDebug().log('MenuItem#onClick: menu: ', menu)
          const deleteSiteRes = await deleteSite(menu.domain)
          customDebug().log('MenuItem#onClick: deleteSiteRes: ', deleteSiteRes)
          const removeDataRes = await removeData(menu._id)
          customDebug().log('MenuItem#onClick: removeDataRes: ', removeDataRes)

          if (!removeDataRes || (!deleteSiteRes && USE_PLAUSIBLE)) {
            setAlertMsg('Site maybe not registered, or check your internet connection.')
            return
          }

          deleteMenu(index)

          if (index === selMenuIndex && index > menuArr.length - 2) {
            customDebug().log('MenuItem#onClick: last menu deleted')
            if (menuArr.length === 1) {
              setSelMenuIndex(null)
            } else {
              setSelMenuIndex(0)
            }
          }
        })}
      />
    </div>
  )
}
