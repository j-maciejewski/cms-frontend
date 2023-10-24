import { useActiveUser } from '@/context/dashboard'
import { useOutsideClick } from '@/hooks'

interface IUserNavDropdown {
  closeDropdown: () => void
}

export const UserNavDropdown = ({ closeDropdown }: IUserNavDropdown) => {
  const wrapperRef = useOutsideClick<HTMLDivElement>(closeDropdown)
  const { activeUser, handleLogout } = useActiveUser()

  return (
    <div
      ref={wrapperRef}
      className="absolute bottom-0 right-0 z-50 w-56 translate-y-[calc(100%_+_13px)] list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
    >
      <div className="px-4 py-3">
        <span className="block text-sm font-semibold text-gray-900 dark:text-white">
          {activeUser.firstName} {activeUser.lastName}
        </span>
        <span className="block truncate text-sm text-gray-500 dark:text-gray-400">{activeUser.email}</span>
      </div>
      <ul className="py-1 text-gray-500 dark:text-gray-400">
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            My profile
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Account settings
          </a>
        </li>
      </ul>
      <ul className="py-1 text-gray-500 dark:text-gray-400">
        <li>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  )
}
