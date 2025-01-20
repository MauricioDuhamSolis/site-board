import React from 'react'
import AddSvg from '../../assets/icons/add.svg'
import {useZustand} from '../../store/useZustand'


export const AddLink = () => {
  const {nextPlausibleStep} = useZustand()

  return (
    <img
      className='h-full bg-white cursor-pointer'
      src={AddSvg}
      alt='Add'
      onClick={nextPlausibleStep}
    />
  )
}
