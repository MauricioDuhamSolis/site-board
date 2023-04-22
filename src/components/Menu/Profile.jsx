import {useAuth0} from '@auth0/auth0-react'
import React from 'react'


export const Profile = () => {
  const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0()

  const logoutWithRedirect = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
  }

  return (
    <div className='flex items-center justify-center h-full gap-2 p-2 text-white'>
      {user?.name}
      {isAuthenticated ?
        <button
          className='pl-2 pr-2 border-2 rounded'
          onClick={logoutWithRedirect}
        >
          Log out
        </button> :
        <button
          className='pl-2 pr-2 border-2 rounded'
          onClick={loginWithRedirect}
        >
          Log in
        </button>
      }
    </div>
  )
}
