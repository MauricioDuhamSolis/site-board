import React from 'react'
import {Dashboard} from './Dashboard'
import {Scene} from './Scene/Scene'


export const MBoard = () => {
  return (
    <div className='absolute w-full h-full'>
      <Dashboard />
      <Scene />
    </div>
  )
}
