'use client'

import { ReactNode, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { EllipsisIcon } from '@/components/icons'
import { useOutsideClick } from '@/hooks'

interface IAction {
  text: ReactNode
  Icon: any
  handleClick: () => void
  disabled?: boolean
}

interface IOptionsCell {
  actions: IAction[]
}

export const OptionsCell = ({ actions }: IOptionsCell) => {
  const [optionsOpen, setOptionsOpen] = useState(false)

  const toggleOptions = () => setOptionsOpen((prev) => !prev)
  const closeOptions = () => setOptionsOpen(false)

  const optionsWrapperRef = useOutsideClick<HTMLDivElement>(closeOptions)

  return (
    <div ref={optionsWrapperRef} className="group relative">
      <button
        className="inline-flex items-center rounded-lg bg-transparent p-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600"
        onClick={toggleOptions}
        title="Options"
      >
        <EllipsisIcon className="h-3 w-3" />
      </button>
      {optionsOpen && (
        <div className="absolute right-0 top-[115%] z-10 w-max divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700">
          <ul className="py-2 dark:text-gray-200">
            {actions.map(({ text, Icon, handleClick, disabled }, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleClick}
                  disabled={disabled}
                >
                  <div className="inline-flex items-center">
                    <Icon className="mr-2 h-3 w-3" />
                    <span className="text-xs">{text}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
