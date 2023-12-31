import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

import { useSidebar } from '@/context/dashboard'

interface ISidebarItem {
  href: string
  name: string
  badge?: string
  Icon: any
}

export const SidebarItem = ({ href, name, badge, Icon }: ISidebarItem) => {
  const { isSidebarOpen } = useSidebar()
  const pathname = usePathname()

  const isActive = useMemo(() => pathname === href, [pathname])

  return (
    <li className="grid h-10 place-items-stretch">
      <Link
        href={href}
        className={twMerge(
          'group flex items-center rounded-lg p-2 text-gray-900 focus:bg-gray-300/50 dark:text-white dark:hover:bg-gray-900/50 dark:focus:bg-gray-900/50 dark:focus:outline-none',
          isActive && 'bg-gray-300/75 dark:bg-gray-900/50',
        )}
      >
        <div className="relative">
          <Icon className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white" />
          {badge && (
            <div className="absolute -right-3 -top-3 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-200 bg-red-600 text-[8px] text-white dark:border-gray-800">
              {badge}
            </div>
          )}
        </div>
        {isSidebarOpen && (
          <span className="ml-3 flex-1 whitespace-nowrap dark:text-gray-300 dark:group-hover:text-white">{name}</span>
        )}
      </Link>
    </li>
  )
}
