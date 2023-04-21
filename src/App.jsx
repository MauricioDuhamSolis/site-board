import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {useControls} from 'leva'
import {Alert} from './components/Utils/Alert'
import {Confirm} from './components/Utils/Confirm'
import {Menu} from './components/Menu/Menu'
import {Plausible} from './components/Plausible/Plausible'
import {BillboardPage} from './components/MBoard/Scene/BillboardPage'
import {MBoard} from './components/MBoard/MBoard'


const App = () => {
  const {fullScreen} = useControls({
    fullScreen: {value: false, label: 'Full Screen'},
  })

  return (
    <BrowserRouter>
      <div className='relative flex flex-col w-screen h-screen'>
        <Menu/>
        <div className='relative w-full h-[calc(100vh-3rem)]'>
          <Routes>
            <Route path='/' element={<MBoard/>}/>
          </Routes>
          <BillboardPage hide={!fullScreen}/>
        </div>
        <Plausible/>
        <Confirm/>
        <Alert/>
      </div>
    </BrowserRouter>
  )
}


export default App
