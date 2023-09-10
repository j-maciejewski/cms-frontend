'use client'

import { ChangeEvent, Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from 'react'

import { UsersTableHeadersKeys } from '@/components/dashboard/UsersTable/consts'
import { DashboardUserFragment } from '@/gql/graphql'

interface IUsersContext {
  users: DashboardUserFragment[]
  searchText: string
  handleChangeSearchText: (evt: ChangeEvent<HTMLInputElement>) => void
  filtersShown: boolean
  setFiltersShown: Dispatch<SetStateAction<boolean>>
}

interface IUsersProviderProps {
  users: DashboardUserFragment[]
  children: ReactNode
}

const UsersProvider = (props: IUsersProviderProps) => {
  const { users, ...rest } = props

  const [searchText, setSearchText] = useState('')
  const handleChangeSearchText = (evt: ChangeEvent<HTMLInputElement>) => setSearchText(evt.target.value)

  const [filtersShown, setFiltersShown] = useState(false)

  const indexedColumns = [UsersTableHeadersKeys.NAME]

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      indexedColumns.some((column) => {
        return true
        // return (user[column] as string).toLowerCase().includes(searchText.toLowerCase())
      }),
    )
  }, [searchText, indexedColumns])

  // console.log({ users, filteredUsers })

  const value = useMemo(
    () => ({ users: filteredUsers, searchText, handleChangeSearchText, filtersShown, setFiltersShown }),
    [users, searchText, filtersShown],
  )

  return <UsersContext.Provider value={value} {...rest} />
}

const useUsers = () => {
  const context = useContext(UsersContext)

  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider')
  }

  return context
}

const UsersContext = createContext<IUsersContext | undefined>(undefined)

export { UsersProvider, useUsers }
