import React from 'react'
import {Scene} from './components/Scene/Scene'
import {Alert} from './components/Utils/Alert'
import {Confirm} from './components/Utils/Confirm'
import {Menu} from './components/Menu/Menu'


const App = () => {
  return (
    <div className='w-screen h-screen bg-black'>
      <Scene/>
      <Menu/>
      <Confirm/>
      <Alert/>
    </div>
  )
}


export default App
