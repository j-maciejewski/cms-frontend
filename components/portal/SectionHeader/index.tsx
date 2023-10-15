import { twMerge } from 'tailwind-merge'

import { CustomComponent } from '@/types'

interface ISectionHeader extends CustomComponent {
  title: string
  path?: string
}

export const SectionHeader = ({ title, path, className }: ISectionHeader) => {
  return (
    <div className={twMerge('flex w-full', className)}>
      <h6 className="border-primary border-l-4 px-4 text-lg font-medium uppercase">
        {path ? (
          <a href={path} rel="noreferrer" target="_blank">
            {title}
          </a>
        ) : (
          title
        )}
      </h6>
      <div className="bg-primary grow" />
    </div>
  )
}
