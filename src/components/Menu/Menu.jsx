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
    <div className='flex w-screen h-12 gap-2 p-2 pb-0 bg-black border-0 border-b-2 border-white'>
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
