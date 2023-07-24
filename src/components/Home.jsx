// import {useAuth0} from '@auth0/auth0-react'
import React from 'react'
import {useZustand} from '../store/useZustand'


export const Home = () => {
  const {menuArr} = useZustand()
  // const {isAuthenticated} = useAuth0()

  return (
    // !isAuthenticated ||
    !menuArr.length
  ) && (
    <div className='absolute z-10 flex flex-col items-center justify-center w-full h-full text-white bg-black text-8xl'>
      {
          // !isAuthenticated ?
          //   <div>Please log in to see billboard.</div> :
          !menuArr.length ?
            <div>Click the &quot;+&quot; to add a site</div> :
            <div/>
      }
    </div>
  )
}
