import { useEffect, useRef } from 'react'

export const useOutsideClick = <TElement extends HTMLElement>(callback: () => void) => {
  const ref = useRef<TElement>(null)

  useEffect(() => {
    const handleClick = (evt: MouseEvent) => {
      if (ref.current && !ref.current.contains(evt.target as Node)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref])

  return ref
}
