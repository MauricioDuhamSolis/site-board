import React, {useEffect} from 'react'
import {Alert} from './components/Utils/Alert'
import {Confirm} from './components/Utils/Confirm'
import {Menu} from './components/Menu/Menu'
import {Plausible} from './components/Plausible/Plausible'
import {Home} from './components/Home'
import {Loading} from './components/Utils/Loading'
import {useAuth0} from '@auth0/auth0-react'
import {useZustand} from './store/useZustand'
import {BillboardPage} from './components/BillboardPage'
import {MBoard} from './components/MBoard/MBoard'


const App = () => {
  const {
    setIsLoading,
    setIsSeeingApp,
  } = useZustand()
  const {isLoading} = useAuth0()

  const onFocusFunction = () => {
    setIsSeeingApp(true)
  }

  const onBlurFunction = () => {
    setIsSeeingApp(false)
  }

  useEffect(() => {
    onFocusFunction()
    window.addEventListener('focus', onFocusFunction)
    window.addEventListener('blur', onBlurFunction)
    return () => {
      onBlurFunction()
      window.removeEventListener('focus', onFocusFunction)
      window.removeEventListener('blur', onBlurFunction)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])

  return (
    <div className='relative flex flex-col w-screen h-screen'>
      <Menu/>
      <div className='relative w-full h-[calc(100vh-3rem)]'>
        <BillboardPage/>
        <MBoard/>
        <Home/>
      </div>
      <Plausible/>
      <Confirm/>
      <Alert/>
      <Loading/>
    </div>
  )
}


export default App
