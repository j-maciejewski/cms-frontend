'use client'

import { ApolloCache, ApolloQueryResult, DefaultContext, MutationTuple, useMutation } from '@apollo/client'
import { debounce } from 'lodash'
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

import { ArticleFormDialogState } from '@/components/dashboard/ArticlesTable/consts'
import { useGrid } from '@/context/GridProvider'
import {
  ArticlesGridInput,
  CreateArticleInput,
  CreateArticleMutation,
  CreateArticleMutationVariables,
  DashboardArticleInListFragment,
  DashboardArticlesQuery,
  DeleteArticleMutation,
  DeleteArticleMutationVariables,
  Exact,
  InputMaybe,
  UpdateArticleInput,
  UpdateArticleMutation,
  UpdateArticleMutationVariables,
} from '@/gql/graphql'
import { useDialogForm } from '@/hooks'
import { dashboardMutations } from '@/services'

interface IArticlesContext {
  articles: DashboardArticleInListFragment[]
  refetchArticles: (
    variables?: Partial<Exact<{ grid?: InputMaybe<ArticlesGridInput> | undefined }>> | undefined,
  ) => Promise<ApolloQueryResult<DashboardArticlesQuery>>
  searchText: string
  handleChangeSearchText: (evt: ChangeEvent<HTMLInputElement>) => void
  filtersShown: boolean
  setFiltersShown: Dispatch<SetStateAction<boolean>>
  createArticleTuple: MutationTuple<
    CreateArticleMutation,
    Exact<{
      createArticleInput: CreateArticleInput
    }>,
    DefaultContext,
    ApolloCache<any>
  >
  updateArticleTuple: MutationTuple<
    UpdateArticleMutation,
    Exact<{
      id: string
      updateArticleInput: UpdateArticleInput
    }>,
    DefaultContext,
    ApolloCache<any>
  >
  deleteArticleTuple: MutationTuple<
    DeleteArticleMutation,
    Exact<{
      id: string
    }>,
    DefaultContext,
    ApolloCache<any>
  >
  formDialog: ArticleFormDialogState
  setFormDialog: Dispatch<SetStateAction<ArticleFormDialogState>>
  formDialogRef: RefObject<HTMLDialogElement>
}

interface IArticlesProviderProps {
  articles: DashboardArticleInListFragment[]
  refetchArticles: (
    variables?: Partial<Exact<{ grid?: InputMaybe<ArticlesGridInput> | undefined }>> | undefined,
  ) => Promise<ApolloQueryResult<DashboardArticlesQuery>>
  children: ReactNode
}

const ArticlesProvider = (props: IArticlesProviderProps) => {
  const { articles, refetchArticles, ...rest } = props
  const { grid, handleChange } = useGrid()

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

  const { formDialogRef, formDialog, setFormDialog } = useDialogForm<ArticleFormDialogState>()

  const [filtersShown, setFiltersShown] = useState(false)

  const createArticleTuple = useMutation<CreateArticleMutation, CreateArticleMutationVariables>(
    dashboardMutations.CREATE_ARTICLE,
  )

  const updateArticleTuple = useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(
    dashboardMutations.UPDATE_ARTICLE,
  )

  const deleteArticleTuple = useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(
    dashboardMutations.DELETE_ARTICLE,
  )

  const value = useMemo(
    () => ({
      articles,
      refetchArticles,
      searchText,
      handleChangeSearchText,
      filtersShown,
      setFiltersShown,
      createArticleTuple,
      updateArticleTuple,
      deleteArticleTuple,
      formDialog,
      setFormDialog,
      formDialogRef,
    }),
    [articles, searchText, filtersShown, formDialog],
  )

  return <ArticlesContext.Provider value={value} {...rest} />
}

const useArticles = () => {
  const context = useContext(ArticlesContext)

  if (context === undefined) {
    throw new Error('useArticles must be used within a ArticlesProvider')
  }

  return context
}

const ArticlesContext = createContext<IArticlesContext | undefined>(undefined)

export { ArticlesProvider, useArticles }
