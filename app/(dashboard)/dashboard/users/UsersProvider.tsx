'use client'

import { ApolloCache, ApolloQueryResult, DefaultContext, MutationTuple, useMutation } from '@apollo/client'
import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { UserFormDialogState, UsersTableHeadersKeys } from '@/components/dashboard/UsersTable/consts'
import { useGrid } from '@/context/dashboard/GridProvider'
import {
  CreateUserInput,
  CreateUserMutation,
  CreateUserMutationVariables,
  DashboardUserFragment,
  DashboardUsersQuery,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  Exact,
  InputMaybe,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UsersGridInput,
} from '@/gql/graphql'
import { useDialogForm } from '@/hooks'
import { dashboardMutations } from '@/services'

interface IUsersContext {
  users: DashboardUserFragment[]
  refetchUsers: () => Promise<ApolloQueryResult<DashboardUsersQuery>>
  searchText: string
  handleChangeSearchText: (evt: ChangeEvent<HTMLInputElement>) => void
  filtersShown: boolean
  setFiltersShown: Dispatch<SetStateAction<boolean>>
  createUserTuple: MutationTuple<
    CreateUserMutation,
    Exact<{
      createUserInput: CreateUserInput
    }>
  >
  updateUserTuple: MutationTuple<
    UpdateUserMutation,
    Exact<{
      id: string
      updateUserInput: UpdateUserInput
    }>
  >
  deleteUserTuple: MutationTuple<DeleteUserMutation, Exact<{ id: string }>>
  formDialog: UserFormDialogState
  setFormDialog: Dispatch<SetStateAction<UserFormDialogState>>
  formDialogRef: RefObject<HTMLDialogElement>
}

interface IUsersProviderProps {
  users: DashboardUserFragment[]
  refetchUsers: (
    variables?: Partial<Exact<{ grid?: InputMaybe<UsersGridInput> | undefined }>> | undefined,
  ) => Promise<ApolloQueryResult<DashboardUsersQuery>>
  children: ReactNode
}

const UsersProvider = (props: IUsersProviderProps) => {
  const { users, refetchUsers, ...rest } = props
  const { grid, handleChange } = useGrid()

  const handleRefetch = useCallback(() => refetchUsers({ grid }), [grid])

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
      refetchUsers: handleRefetch,
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
    [users, searchText, filtersShown, formDialog, handleRefetch],
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
