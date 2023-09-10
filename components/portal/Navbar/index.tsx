'use client'

import Link from 'next/link'

import { useRoutes } from '../../../context/RoutesProvider'

import styles from './styles.module.css'

export const Navbar = () => {
  const { routes } = useRoutes()

  return (
    <nav className={`${styles.navbar} grow hidden w-full md:block md:w-auto`}>
      <ul className="flex justify-center mr-auto">
        {routes.map((tab, idx) => (
          <li key={idx} className={`${styles.active} p-3 xl:p-6`}>
            <Link href={tab.path}>{tab.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
