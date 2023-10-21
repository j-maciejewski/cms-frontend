import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '../../icons'

type IconLink = {
  Icon: any
  url: string
  className?: string
}

const links: IconLink[] = [
  {
    url: 'https://www.facebook.com',
    Icon: FacebookIcon,
    className: 'fill-[#316FF6]',
  },
  {
    url: 'https://www.twitter.com',
    Icon: TwitterIcon,
    className: 'fill-[#1d9bf0]',
  },
  {
    url: 'https://www.instagram.com',
    Icon: InstagramIcon,
  },
  {
    url: 'https://www.youtube.com',
    Icon: YoutubeIcon,
  },
]

const IconLink = ({ Icon, className, url }: IconLink) => {
  return (
    <a href={url} rel="noreferrer" target="_blank">
      <Icon className={className} height={24} />
    </a>
  )
}

export const SocialLinks = () => {
  return (
    <div className="flex justify-center gap-4">
      {links.map((link, idx) => (
        <IconLink key={idx} {...link} />
      ))}
    </div>
  )
}
