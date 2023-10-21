'use client'

import Image from 'next/image'
import { ComponentProps, useState } from 'react'

export const ImageWithFallback = (props: ComponentProps<typeof Image>) => {
  const [src, setSrc] = useState<string>(typeof props.src === 'string' ? props.src : '')

  const handleError = () => setSrc('/image-not-available.png')

  return <Image {...props} src={src} onError={handleError} />
}
