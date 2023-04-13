/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import {useZustand} from '../../store/useZustand'
import classNames from 'classnames'


export const MenuItem = ({index, menu}) => {
  const {
    selMenuIndex,
    setSelMenuIndex,
  } = useZustand()

  return (
    <div className={classNames({
      'flex items-center justify-center gap-2 p-2 text-white border-2 border-b-0 rounded-tl rounded-tr cursor-pointer': true,
      'border-white': index === selMenuIndex,
      'border-gray-500': index !== selMenuIndex,
    })}
    >
      <div onClick={() => setSelMenuIndex(index)}>{menu.domain}</div>
    </div>
  )
}
