/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
import React from 'react'
import classNames from 'classnames'
import {useZustand} from '../../store/useZustand'
import CloseSvg from '../../assets/icons/close.svg'


export const Close = () => {
  const {setPlausibleStep} = useZustand()

  return (
    <img
      className='absolute w-8 h-8 bg-white cursor-pointer right-1 top-1'
      src={CloseSvg}
      alt='Close'
      onClick={() => setPlausibleStep(0)}
    />
  )
}
