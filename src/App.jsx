import React from 'react'
import {Scene} from './components/Scene/Scene'
import {Alert} from './components/Utils/Alert'
import {Confirm} from './components/Utils/Confirm'
import {Menu} from './components/Menu/Menu'
import {Plausible} from './components/Plausible/Plausible'
import {Dashboard} from './components/Dashboard'


const App = () => {
  return (
    <div className='w-screen h-screen bg-black'>
      <Scene/>
      <Menu/>
      <Dashboard/>
      <Plausible/>
      <Confirm/>
      <Alert/>
    </div>
  )
}


export default App
