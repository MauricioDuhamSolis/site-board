import React from 'react'
import CloseSvg from '../../assets/icons/close.svg'
import {useZustand} from '../../store/useZustand'


export const Close = () => {
  const {closePlausible} = useZustand()

  return (
    <img
      className='absolute w-8 h-8 bg-white cursor-pointer right-1 top-1'
      src={CloseSvg}
      alt='Close'
      onClick={closePlausible}
    />
  )
}
