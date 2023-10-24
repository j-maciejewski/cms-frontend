'use client'

import { ApolloQueryResult } from '@apollo/client'
import { debounce } from 'lodash'
import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { useGrid } from '@/context/dashboard/GridProvider'
import { DashboardMessageFragment, DashboardMessagesQuery, Exact, InputMaybe, MessagesGridInput } from '@/gql/graphql'

interface IMessagesContext {
  messages: DashboardMessageFragment[]
  refetchMessages: () => Promise<ApolloQueryResult<DashboardMessagesQuery>>
  searchText: string
  handleChangeSearchText: (evt: ChangeEvent<HTMLInputElement>) => void
  filtersShown: boolean
  setFiltersShown: Dispatch<SetStateAction<boolean>>
}

interface IMessagesProviderProps {
  messages: DashboardMessageFragment[]
  refetchMessages: (
    variables?: Partial<Exact<{ grid?: InputMaybe<MessagesGridInput> | undefined }>> | undefined,
  ) => Promise<ApolloQueryResult<DashboardMessagesQuery>>
  children: ReactNode
}

const MessagesProvider = (props: IMessagesProviderProps) => {
  const { messages, refetchMessages, ...rest } = props
  const { grid, handleChange } = useGrid()

  const handleRefetch = useCallback(() => refetchMessages({ grid }), [grid])

  const triggerSearch = (searchValue: string) => {
    const trimmedValue = searchValue.trim()

    if (!trimmedValue) {
      handleChange('fullText', null)
      return
    }

    handleChange('fullText', trimmedValue)
  }

  const handleSearch = useMemo(() => debounce(triggerSearch, 1000), [])

  const [searchText, setSearchText] = useState(grid?.filter?.fullText ?? '')
  const handleChangeSearchText = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.target.value)
    handleSearch(evt.target.value)
  }

  const [filtersShown, setFiltersShown] = useState(false)

  const value = useMemo(
    () => ({
      messages,
      refetchMessages: handleRefetch,
      searchText,
      handleChangeSearchText,
      filtersShown,
      setFiltersShown,
    }),
    [messages, searchText, filtersShown, handleRefetch],
  )

  return <MessagesContext.Provider value={value} {...rest} />
}

const useMessages = () => {
  const context = useContext(MessagesContext)

  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider')
  }

  return context
}

const MessagesContext = createContext<IMessagesContext | undefined>(undefined)

export { MessagesProvider, useMessages }
