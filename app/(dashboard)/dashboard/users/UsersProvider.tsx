'use client'

import { ApolloCache, DefaultContext, MutationTuple, useMutation } from '@apollo/client'
import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'

import { UserFormDialogState, UsersTableHeadersKeys } from '@/components/dashboard/UsersTable/consts'
import {
  CreateUserInput,
  CreateUserMutation,
  CreateUserMutationVariables,
  DashboardUserFragment,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  Exact,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '@/gql/graphql'
import { useDialogForm } from '@/hooks'
import { dashboardMutations } from '@/services'

interface IUsersContext {
  users: DashboardUserFragment[]
  searchText: string
  handleChangeSearchText: (evt: ChangeEvent<HTMLInputElement>) => void
  filtersShown: boolean
  setFiltersShown: Dispatch<SetStateAction<boolean>>
  createUserTuple: MutationTuple<
    CreateUserMutation,
    Exact<{
      createUserInput: CreateUserInput
    }>,
    DefaultContext,
    ApolloCache<any>
  >
  updateUserTuple: MutationTuple<
    UpdateUserMutation,
    Exact<{
      id: string
      updateUserInput: UpdateUserInput
    }>,
    DefaultContext,
    ApolloCache<any>
  >
  deleteUserTuple: MutationTuple<
    DeleteUserMutation,
    Exact<{
      id: string
    }>,
    DefaultContext,
    ApolloCache<any>
  >
  formDialog: UserFormDialogState
  setFormDialog: Dispatch<SetStateAction<UserFormDialogState>>
  formDialogRef: RefObject<HTMLDialogElement>
}

interface IUsersProviderProps {
  users: DashboardUserFragment[]
  children: ReactNode
}

const UsersProvider = (props: IUsersProviderProps) => {
  const { users, ...rest } = props

  const [searchText, setSearchText] = useState('')
  const handleChangeSearchText = (evt: ChangeEvent<HTMLInputElement>) => setSearchText(evt.target.value)

  const { formDialogRef, formDialog, setFormDialog } = useDialogForm<UserFormDialogState>()

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

  const createUserTuple = useMutation<CreateUserMutation, CreateUserMutationVariables>(dashboardMutations.CREATE_USER)

  const updateUserTuple = useMutation<UpdateUserMutation, UpdateUserMutationVariables>(dashboardMutations.UPDATE_USER)

  const deleteUserTuple = useMutation<DeleteUserMutation, DeleteUserMutationVariables>(dashboardMutations.DELETE_USER)

  const value = useMemo(
    () => ({
      users: filteredUsers,
      searchText,
      handleChangeSearchText,
      filtersShown,
      setFiltersShown,
      createUserTuple,
      updateUserTuple,
      deleteUserTuple,
      formDialog,
      setFormDialog,
      formDialogRef,
    }),
    [users, searchText, filtersShown, formDialog],
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
