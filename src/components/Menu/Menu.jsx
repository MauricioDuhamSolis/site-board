import React, {useEffect} from 'react'
import {MenuItem} from './MenuItem'
import {AddLink} from './AddLink'
import {useZustand} from '../../store/useZustand'
import {customDebug} from '../../utils/custom.debug'
import {getAllData} from '../../utils/mongo.db'


export const Menu = () => {
  const {
    menuArr,
    setMenuArr,
    setSelMenuIndex,
    isLoading,
    setIsLoading,
  } = useZustand()

  useEffect(() => {
    (async () => {
      if (isLoading) {
        return
      }
      setIsLoading(true)
      const getAllDataRes = await getAllData()
      customDebug().log('Menu#useEffect[setMenuArr, setSelMenuIndex]: getAllDataRes: ', getAllDataRes)

      if (Array.isArray(getAllDataRes) && getAllDataRes.length) {
        setMenuArr(getAllDataRes)
        setSelMenuIndex(0)
      }

      setIsLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex items-center justify-between w-screen h-12 bg-black border-0 border-b-2 border-white'>
      <div className='flex h-full gap-2 p-2 pb-0'>
        {menuArr.map((menu, index) =>
          <MenuItem
            key={index}
            index={index}
            menu={menu}
          />,
        )}
        <AddLink/>
      </div>
    </div>
  )
}
