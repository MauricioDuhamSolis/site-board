import React from 'react'
import {Scene} from './components/Scene/Scene'
import {Alert} from './components/Utils/Alert'
import {Confirm} from './components/Utils/Confirm'
import {Menu} from './components/Menu/Menu'
import {Plausible} from './components/Plausible/Plausible'
import {Dashboard} from './components/Dashboard'
import {BillboardPage} from './components/Scene/BillboardPage'
import {useControls} from 'leva'


const App = () => {
  const {fullScreen} = useControls({
    fullScreen: {value: false, label: 'Full Screen'},
  })

  return (
    <div className='relative flex flex-col w-screen h-screen bg-black'>
      <Menu/>
      <div className='relative w-full h-[calc(100vh-3rem)]'>
        <Dashboard/>
        <Scene/>
      </div>
      <BillboardPage hide={!fullScreen}/>
      <Plausible/>
      <Confirm/>
      <Alert/>
    </div>
  )
}


export default App
