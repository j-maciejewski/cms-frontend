import type { HistoryState } from '@lexical/react/LexicalHistoryPlugin'
import { createEmptyHistoryState } from '@lexical/react/LexicalHistoryPlugin'
import { Context as ReactContext, ReactNode, createContext, useContext, useMemo } from 'react'

type ContextShape = {
  historyState?: HistoryState
}

const Context: ReactContext<ContextShape> = createContext({})

export const SharedHistoryContext = ({ children }: { children: ReactNode }): JSX.Element => {
  const historyContext = useMemo(() => ({ historyState: createEmptyHistoryState() }), [])
  return <Context.Provider value={historyContext}>{children}</Context.Provider>
}

export const useSharedHistoryContext = (): ContextShape => {
  return useContext(Context)
}
