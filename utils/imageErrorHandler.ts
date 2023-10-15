import { SyntheticEvent } from 'react'

export const imageOnError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
  event.currentTarget.src = 'image-not-available.png'
}
