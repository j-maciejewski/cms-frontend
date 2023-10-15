'use client'

import Link from 'next/link'

import { useRoutes } from '../../../context/RoutesProvider'

export const Navbar = () => {
  const { routes } = useRoutes()

  return (
    <nav className="hidden w-full grow md:block md:w-auto">
      <ul className="mr-auto flex justify-center">
        {routes.map((tab, idx) => (
          <li key={idx} className="p-2 text-sm xl:p-4">
            <Link href={tab.path}>{tab.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
