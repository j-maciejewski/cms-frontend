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

import { CategoriesTableHeadersKeys, CategoryFormDialogState } from '@/components/dashboard/CategoriesTable/consts'
import {
  CreateCategoryInput,
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  DashboardCategoriesQuery,
  DashboardCategoryInListFragment,
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables,
  Exact,
  UpdateCategoryInput,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
} from '@/gql/graphql'
import { useDialogForm } from '@/hooks'
import { dashboardMutations } from '@/services'

interface ICategoriesContext {
  categories: DashboardCategoryInListFragment[]
  refetchCategories: () => Promise<ApolloQueryResult<DashboardCategoriesQuery>>
  searchText: string
  handleChangeSearchText: (evt: ChangeEvent<HTMLInputElement>) => void
  filtersShown: boolean
  setFiltersShown: Dispatch<SetStateAction<boolean>>
  createCategoryTuple: MutationTuple<
    CreateCategoryMutation,
    Exact<{
      createCategoryInput: CreateCategoryInput
    }>
  >
  updateCategoryTuple: MutationTuple<
    UpdateCategoryMutation,
    Exact<{
      id: string
      updateCategoryInput: UpdateCategoryInput
    }>
  >
  deleteCategoryTuple: MutationTuple<
    DeleteCategoryMutation,
    Exact<{
      id: string
    }>
  >
  formDialog: CategoryFormDialogState
  setFormDialog: Dispatch<SetStateAction<CategoryFormDialogState>>
  formDialogRef: RefObject<HTMLDialogElement>
}

interface ICategoriesProviderProps {
  categories: DashboardCategoryInListFragment[]
  refetchCategories: () => Promise<ApolloQueryResult<DashboardCategoriesQuery>>
  children: ReactNode
}

const CategoriesProvider = (props: ICategoriesProviderProps) => {
  const { categories, refetchCategories, ...rest } = props

  const handleRefetch = useCallback(() => refetchCategories(), [])

  const [searchText, setSearchText] = useState('')
  const handleChangeSearchText = (evt: ChangeEvent<HTMLInputElement>) => setSearchText(evt.target.value)

  const { formDialogRef, formDialog, setFormDialog } = useDialogForm<CategoryFormDialogState>()

  const [filtersShown, setFiltersShown] = useState(false)

  const indexedColumns = [CategoriesTableHeadersKeys.NAME]

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      indexedColumns.some((column) => {
        return (category[column] as string).toLowerCase().includes(searchText.toLowerCase())
      }),
    )
  }, [searchText, indexedColumns, categories])

  const createCategoryTuple = useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(
    dashboardMutations.CREATE_CATEGORY,
  )

  const updateCategoryTuple = useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(
    dashboardMutations.UPDATE_CATEGORY,
  )

  const deleteCategoryTuple = useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(
    dashboardMutations.DELETE_CATEGORY,
  )

  const value = useMemo(
    () => ({
      categories: filteredCategories,
      refetchCategories: handleRefetch,
      searchText,
      handleChangeSearchText,
      filtersShown,
      setFiltersShown,
      createCategoryTuple,
      updateCategoryTuple,
      deleteCategoryTuple,
      formDialog,
      setFormDialog,
      formDialogRef,
    }),
    [filteredCategories, searchText, filtersShown, formDialog, handleRefetch],
  )

  return <CategoriesContext.Provider value={value} {...rest} />
}

const useCategories = () => {
  const context = useContext(CategoriesContext)

  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoriesProvider')
  }

  return context
}

const CategoriesContext = createContext<ICategoriesContext | undefined>(undefined)

export { CategoriesProvider, useCategories }
