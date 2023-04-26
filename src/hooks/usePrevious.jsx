import {useEffect, useRef} from 'react'


export const usePrevious = (value, initialValue) => {
  const ref = useRef(initialValue)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
