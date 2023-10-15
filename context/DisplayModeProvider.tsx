'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from 'react'

export enum DisplayModes {
  TWO_PER_ROW = 'TWO_PER_ROW',
  THREE_PER_ROW = 'THREE_PER_ROW',
  FOUR_PER_ROW = 'FOUR_PER_ROW',
}

interface IDisplayModeContext {
  displayMode: DisplayModes
  changeDisplayMode: (newDisplayMode: DisplayModes) => void
}

interface IDisplayModeProviderProps {
  children: ReactNode
}

const DisplayModeProvider = (props: IDisplayModeProviderProps) => {
  const [displayMode, setDisplayMode] = useState<DisplayModes>(() => {
    const storedDisplayMode = localStorage.getItem('displayMode')

    if (Object.values(DisplayModes).includes(storedDisplayMode as unknown as DisplayModes)) return storedDisplayMode as DisplayModes

    return DisplayModes.THREE_PER_ROW
  })

  const changeDisplayMode = (newDisplayMode: DisplayModes) => {
    localStorage.setItem('displayMode', newDisplayMode)
    setDisplayMode(newDisplayMode)
  }

  const value = useMemo(() => ({ displayMode, changeDisplayMode }), [displayMode])

  return <DisplayModeContext.Provider value={value} {...props} />
}

const useDisplayMode = () => {
  const context = useContext(DisplayModeContext)

  if (context === undefined) {
    throw new Error('useDisplayMode must be used within a DisplayModeProvider')
  }

  return context
}

const DisplayModeContext = createContext<IDisplayModeContext | undefined>(undefined)

export { DisplayModeProvider, useDisplayMode }
