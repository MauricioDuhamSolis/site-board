import React from 'react'
import {useZustand} from '../../store/useZustand'


export const Loading = () => {
  const {isLoading} = useZustand()

  return isLoading && (
    <div className='fixed z-20 flex items-center justify-center w-screen h-screen bg-gray-500 opacity-40'>
      <div className='w-24 h-24 border-8 rounded-full animate-spin border-l-red-500' />
    </div>
  )
}
