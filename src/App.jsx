import React, {useEffect} from 'react'
import {Alert} from './components/Utils/Alert'
import {Confirm} from './components/Utils/Confirm'
import {Menu} from './components/Menu/Menu'
import {Plausible} from './components/Plausible/Plausible'
import {Home} from './components/Home'
import {Loading} from './components/Utils/Loading'
import {useAuth0} from '@auth0/auth0-react'
import {useZustand} from './store/useZustand'
import {FullBillboardPage} from './components/FullBillboardPage'
import {MBoard} from './components/MBoard/MBoard'


const App = () => {
  const {setIsLoading} = useZustand()
  const {isLoading, isAuthenticated} = useAuth0()

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])

  return (
    <div className='relative flex flex-col w-screen h-screen'>
      <Menu/>
      <div className='relative w-full h-[calc(100vh-3rem)]'>
        {isAuthenticated ?
          <>
            <FullBillboardPage/>
            <MBoard/>
          </> :
          <Home/>
        }
      </div>
      <Plausible/>
      <Confirm/>
      <Alert/>
      <Loading/>
    </div>
  )
}


export default App
