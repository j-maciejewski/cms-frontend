'use client'

import { useTheme } from 'next-themes'

import { MoonIcon, SunIcon } from '@/components/icons'

export const ToggleThemeButton = () => {
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <button
      className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
      onClick={() => (currentTheme === 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      {currentTheme === 'dark' ? <SunIcon className="w-5 fill-gray-200" /> : <MoonIcon className="w-5 fill-gray-400" />}
    </button>
  )
}
