import React from 'react'
import classNames from 'classnames'
import {HexColorPicker} from 'react-colorful'
import {useZustand} from '../../store/useZustand'


export const ColorPicker = ({className, selColor, onChange}) => {
  const {
    showColorPicker,
  } = useZustand()

  return (
    <div
      className={classNames({
        [className]: true,
        'p-4 overflow-auto border border-black rounded cursor-pointer max-h-[calc(100vh-1rem)]': true,
        'hidden': !showColorPicker,
      })}
    >
      <HexColorPicker
        color={selColor || '#ffffff'}
        onChange={onChange}
      />
      <div className=''/>
    </div>
  )
}
