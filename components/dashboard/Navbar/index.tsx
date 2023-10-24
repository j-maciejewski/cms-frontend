import Image from 'next/image'
import { useState } from 'react'

import { BarsIcon } from '@/components/icons'
import { useSidebar } from '@/context/dashboard'

import { ToggleThemeButton } from '../ToggleThemeButton'
import { UserNavDropdown } from '../UserNavDropdown'

export const Navbar = () => {
  const { toggleSidebar } = useSidebar()
  const [userNavDropdownOpen, setUserNavDropdownOpen] = useState(false)

  const openDropdown = () => setUserNavDropdownOpen(true)
  const closeDropdown = () => setUserNavDropdownOpen(false)

  return (
    <>
      <nav className="fixed top-0 z-50 h-[60px] w-full border-b border-gray-100 bg-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                onClick={toggleSidebar}
                className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <BarsIcon className="h-5 w-5" />
              </button>
              <div className="ml-4 flex md:mr-24">
                <Image src="/jol.gif" height={24} width={100} alt="logo" priority={true} className="mr-3 h-8 w-auto" />
              </div>
            </div>

            <div className="flex items-center">
              <ToggleThemeButton />
              <div className="relative ml-3 flex items-center">
                <div>
                  <button
                    type="button"
                    className="flex rounded-full bg-gray-800 text-sm"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    onClick={openDropdown}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                {userNavDropdownOpen && <UserNavDropdown closeDropdown={closeDropdown} />}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
