import classNames from 'classnames'
import React from 'react'
import CloseSvg from '../../assets/icons/close.svg'
import {useZustand} from '../../store/useZustand'
import {USE_PLAUSIBLE} from '../../utils/constants'
import {customDebug} from '../../utils/custom.debug'
import {removeData} from '../../utils/mongo.db'
import {deleteSite} from '../../utils/plausible'


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
