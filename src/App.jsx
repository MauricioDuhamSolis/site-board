import {useAuth0} from '@auth0/auth0-react'
import activityDetector from 'activity-detector'
import React, {useEffect} from 'react'
import {BillboardPage} from './components/BillboardPage'
import {Home} from './components/Home'
import {MBoard} from './components/MBoard/MBoard'
import {Menu} from './components/Menu/Menu'
import {Plausible} from './components/Plausible/Plausible'
import {Alert} from './components/Utils/Alert'
import {Confirm} from './components/Utils/Confirm'
import {Loading} from './components/Utils/Loading'
import {useZustand} from './store/useZustand'
import {customDebug} from './utils/custom.debug'


const App = () => {
  const {setIsLoading, setIsSeeingApp} = useZustand()
  const {isLoading} = useAuth0()

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])

  useEffect(() => {
    newActivityDetector.on('idle', () => {
      customDebug().log('App#useEffect: user idle')
      setIsSeeingApp(false)
    })
    newActivityDetector.on('active', () => {
      customDebug().log('App#useEffect: user active')
      setIsSeeingApp(true)
    })
  }, [])

  return (
    <div className='relative flex flex-col w-screen h-screen'>
      <Menu />
      <div className='relative w-full h-[calc(100vh-3rem)]'>
        <BillboardPage />
        <MBoard />
        <Home />
      </div>
      <Plausible />
      <Confirm />
      <Alert />
      <Loading />
    </div>
  )
}

const newActivityDetector = activityDetector({
  timeToIdle: 600000,
})

export default App
