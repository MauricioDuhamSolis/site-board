/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react'
import {useControls} from 'leva'
import {Alert} from './components/Utils/Alert'
import {Confirm} from './components/Utils/Confirm'
import {Menu} from './components/Menu/Menu'
import {Plausible} from './components/Plausible/Plausible'
import {BillboardPage} from './components/MBoard/Scene/BillboardPage'
import {MBoard} from './components/MBoard/MBoard'
import {Home} from './components/Home'
import {Loading} from './components/Utils/Loading'
import {useAuth0} from '@auth0/auth0-react'
import {useZustand} from './store/useZustand'


const App = () => {
  const {fullScreen} = useControls({
    fullScreen: {value: false, label: 'Full Screen'},
  })
  const {setIsLoading} = useZustand()
  const {isLoading} = useAuth0()

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])

  return (
    <div className='relative flex flex-col w-screen h-screen'>
      <Menu/>
      <div className='relative w-full h-[calc(100vh-3rem)]'>
        <Home/>
        {/* <MBoard/> */}
        <BillboardPage hide={!fullScreen}/>
      </div>
      <Plausible/>
      <Confirm/>
      <Alert/>
      <Loading/>
    </div>
  )
}


export default App
