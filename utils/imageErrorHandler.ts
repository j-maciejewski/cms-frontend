import { SyntheticEvent } from 'react'

export const imageOnError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
  console.log(1)
  event.currentTarget.src = 'image-not-available.png'
  // event.currentTarget.className = "error";
}
