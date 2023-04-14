import React from 'react'
import {Scene} from './components/Scene/Scene'
import {Alert} from './components/Utils/Alert'
import {Confirm} from './components/Utils/Confirm'
import {Menu} from './components/Menu/Menu'
import {Plausible} from './components/Plausible/Plausible'
import {Dashboard} from './components/Dashboard'


const App = () => {
  return (
    <div className='relative flex flex-col w-screen h-screen bg-black'>
      <Menu/>
      <div className='relative w-full h-[calc(100vh-3rem)]'>
        <Scene/>
        <Dashboard/>
      </div>
      <Plausible/>
      <Confirm/>
      <Alert/>
    </div>
  )
}


export default App
