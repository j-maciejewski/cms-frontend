import Link from 'next/link'

import { useSidebar } from '@/context/SidebarProvider'

interface ILinkItem {
  href: string
  name: string
  badge?: string
  Icon: any
}

export const SidebarItem = ({ href, name, badge, Icon }: ILinkItem) => {
  const { isSidebarOpen } = useSidebar()

  return (
    <li className="h-10 grid place-items-stretch">
      <Link
        href={href}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-900 group"
      >
        <div className="relative">
          <Icon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
          {badge && (
            <div className="absolute inline-flex items-center justify-center w-5 h-5 text-[8px] text-white bg-red-600 border-2 border-gray-200 rounded-full -top-3 -right-3 dark:border-gray-800">
              {badge}
            </div>
          )}
        </div>
        {isSidebarOpen && (
          <span className="flex-1 ml-3 whitespace-nowrap dark:text-gray-300 dark:group-hover:text-white">{name}</span>
        )}
      </Link>
    </li>
  )
}
