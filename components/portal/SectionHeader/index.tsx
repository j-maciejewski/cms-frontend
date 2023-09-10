import { twMerge } from 'tailwind-merge'

import { CustomComponent } from '@/types'

interface ISectionHeader extends CustomComponent {
  title: string
  path?: string
}

export const SectionHeader = ({ title, path, className }: ISectionHeader) => {
  return (
    <div className={twMerge('flex w-full', className)}>
      <h6 className="border-l-4 border-green2-normal uppercase px-4 text-lg font-medium">
        {path ? (
          <a href={path} rel="noreferrer" target="_blank">
            {title}
          </a>
        ) : (
          title
        )}
      </h6>
      <div className="grow bg-green2-normal" />
    </div>
  )
}
