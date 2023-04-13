import React, {useEffect} from 'react'
import classNames from 'classnames'
import {useZustand} from '../../store/useZustand'
import {MenuItem} from './MenuItem'
import {AddLink} from './AddLink'
import {customDebug} from '../../utils/custom.debug'
import {getAllData} from '../../utils/mongo.db'


export const Menu = () => {
  const {
    isSeeingBillboard,
    menuArr,
    setMenuArr,
    setSelMenuIndex,
  } = useZustand()

  useEffect(() => {
    (async () => {
      if (isLoading) {
        return
      }
      isLoading = true
      const getAllDataRes = await getAllData()
      customDebug().log('Menu#useEffect: getAllDataRes: ', getAllDataRes)
      if (Array.isArray(getAllDataRes) && getAllDataRes.length) {
        setMenuArr(getAllDataRes)
        setSelMenuIndex(0)
      }
      isLoading = false
    })()
  }, [setMenuArr, setSelMenuIndex])

  return (
    <div className={classNames({
      'absolute top-0 flex w-screen h-12 gap-2 p-2 pb-0 bg-black border-0 border-b-2 border-white': true,
      'hidden': isSeeingBillboard,
    })}
    >
      {menuArr.map((menu, index) =>
        <MenuItem
          key={index}
          index={index}
          menu={menu}
        />,
      )}
      <AddLink/>
    </div>
  )
}


let isLoading = false
