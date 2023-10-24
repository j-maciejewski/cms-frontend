'use client'

import { twMerge } from 'tailwind-merge'

import { Grid2x2Icon, Grid3x3Icon, Grid4x4Icon } from '@/components/icons'
import { DisplayModes, useDisplayMode } from '@/context/portal'

export const DisplayModeButtons = () => {
  const { displayMode, changeDisplayMode } = useDisplayMode()

  const options = [
    {
      mode: DisplayModes.TWO_PER_ROW,
      Icon: Grid2x2Icon,
    },
    {
      mode: DisplayModes.THREE_PER_ROW,
      Icon: Grid3x3Icon,
    },
    {
      mode: DisplayModes.FOUR_PER_ROW,
      Icon: Grid4x4Icon,
    },
  ]

  return (
    <div className="flex gap-4">
      {options.map(({ Icon, mode }, idx) => (
        <button key={idx} onClick={() => changeDisplayMode(mode)} disabled={displayMode === mode}>
          <Icon className={twMerge('h-5 w-5', displayMode === mode ? 'fill-gray-700' : 'fill-gray-500')} />
        </button>
      ))}
    </div>
  )
}
