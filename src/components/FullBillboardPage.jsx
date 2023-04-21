import React from 'react'
import {BillboardPage} from './MBoard/Scene/BillboardPage'
import {useControls} from 'leva'


export const FullBillboardPage = () => {
  const {fullScreen} = useControls({
    fullScreen: {value: false, label: 'Full Screen'},
  })

  return (
    <BillboardPage hide={!fullScreen}/>
  )
}
