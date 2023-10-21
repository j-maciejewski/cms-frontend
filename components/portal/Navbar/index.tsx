'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import { useRoutes } from '../../../context/RoutesProvider'

export const Navbar = () => {
  const { routes } = useRoutes()
  const pathname = usePathname()

  return (
    <nav className="hidden w-full grow md:block md:w-auto">
      <ul className="mr-auto flex justify-center gap-2">
        {routes.map((tab, idx) => (
          <li
            key={idx}
            className={twMerge(
              'border-b-4 border-b-primary/25 p-2 text-sm font-medium uppercase tracking-wider hover:border-b-primary xl:p-3',
              tab.path === pathname.toLowerCase() && 'border-b-primary',
            )}
          >
            <Link href={tab.path}>{tab.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
