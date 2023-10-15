import { SocialLinks, WeatherWidget } from '..'
import { ActionLinks } from '../ActionLinks'

export const Aside = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col overflow-hidden"></div>
      <WeatherWidget />
      <SocialLinks />
      <ActionLinks />
    </div>
  )
}
