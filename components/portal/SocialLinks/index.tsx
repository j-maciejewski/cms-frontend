import { twMerge } from 'tailwind-merge'

import { CustomComponent } from '@/types'

import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '../../icons'

export const SocialLinks = ({ className }: CustomComponent) => {
  return (
    <div className={twMerge('flex gap-4 justify-center', className)}>
      <a href="https://www.facebook.com" rel="noreferrer" target="_blank">
        <FacebookIcon styles={{ fill: '#1e3050' }} height={24} />
      </a>
      <a href="https://www.twitter.com" rel="noreferrer" target="_blank">
        <TwitterIcon styles={{ fill: '#1d9bf0' }} height={24} />
      </a>
      <a href="https://www.instagram.com" rel="noreferrer" target="_blank">
        <InstagramIcon styles={{ fill: '#1d9bf0' }} height={24} />
      </a>
      <a href="https://www.youtube.com" rel="noreferrer" target="_blank">
        <YoutubeIcon styles={{ fill: 'red' }} height={24} />
      </a>
    </div>
  )
}
