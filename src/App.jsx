import React from 'react'
import {Scene} from './components/Scene'
import {Alert} from './components/Utils/Alert'
import {Confirm} from './components/Utils/Confirm'


const App = () => {
  return (
    <div className='w-screen h-screen bg-black'>
      <Scene/>
      <Confirm/>
      <Alert/>
    </div>
  )
}


export default App
