import React, {useRef} from 'react'
import {useZustand} from '../../store/useZustand'
import {createSite} from '../../utils/plausible'


export const Create = () => {
  const {
    nextPlausibleStep,
    setAlertMsg,
  } = useZustand()
  const inputRef = useRef(null)

  return (
    <>
      <input
        className='w-3/5 p-1 text-black rounded'
        ref={inputRef}
        type='text'
      />
      <button
        className='pl-2 pr-2 border-2 rounded'
        onClick={async () => {
          const inputVal = inputRef.current.value

          if (!inputVal) {
            setAlertMsg('Input domain please.')
            return
          }

          const createSiteRes = await createSite(inputVal)
          console.log(createSiteRes)
          nextPlausibleStep()
        }}
      >
        Enter
      </button>
    </>
  )
}
