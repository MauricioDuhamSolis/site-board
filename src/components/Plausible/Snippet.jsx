import React from 'react'
import {useZustand} from '../../store/useZustand'


export const Snippet = () => {
  const {
    nextPlausibleStep,
    menuArr,
    selMenuIndex,
  } = useZustand()

  const domain = menuArr[selMenuIndex]?.domain

  return (
    <>
      <div>Add this script to the head section of the page you want to track</div>
      <div>{domain && `<script defer data-domain="${domain}" src="https://plausible.io/js/script.js"></script>`}</div>
      <button
        className='pl-2 pr-2 border-2 rounded'
        onClick={() => {
          nextPlausibleStep()
        }}
      >
        Ok
      </button>
    </>
  )
}
