/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import {useZustand} from '../../store/useZustand'
import AddSvg from '../../assets/icons/add.svg'


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
