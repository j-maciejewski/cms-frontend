import { Dispatch, SetStateAction } from 'react'
import { twMerge } from 'tailwind-merge'

import { useOutsideClick } from '@/hooks'

interface IToggleFiltersButton {
  setFiltersShown: Dispatch<SetStateAction<boolean>>
}

export const ToggleFiltersButton = ({ setFiltersShown }: IToggleFiltersButton) => {
  const toggleConfig = () => setFiltersShown((prev) => !prev)

  return (
    <button
      onClick={toggleConfig}
      className="button px-4 py-2 text-sm font-medium text-center inline-flex items-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:text-gray-700 dark:bg-gray-700 dark:hover:text-white dark:hover:bg-gray-700"
    >
      Filter
    </button>
  )
}
