'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

import { useCategories } from '@/context/portal'

export const Navbar = () => {
  const { categories } = useCategories()
  const pathname = usePathname()

  const routes = useMemo(
    () => [
      { name: 'Home', path: '/' },
      ...categories.map((cat) => ({ name: cat.name, path: `/category/${cat.slug}` })),
    ],
    [categories],
  )

  return (
    <nav className="hidden w-full grow md:block md:w-auto">
      <ul className="mr-auto flex justify-center gap-2">
        {routes.map((tab, idx) => (
          <li
            key={idx}
            className="relative border-b-4 border-b-primary/25 p-2 text-sm font-medium uppercase tracking-wider hover:border-b-primary/75 xl:p-3"
          >
            {tab.path === pathname.toLowerCase() && (
              <motion.span
                layoutId="nav-underline"
                className="absolute left-0 top-full block h-[4px] w-full bg-primary"
              />
            )}
            <Link href={tab.path}>{tab.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
