'use client'

import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import { useCategories } from '@/app/(dashboard)/dashboard/categories/CategoriesProvider'
import { PenIcon, Spinner2Icon, XmarkIcon } from '@/components/icons'
import { DashboardCategoriesQuery, DashboardCategoryFragment } from '@/gql/graphql'
import { dashboardQueries } from '@/services'
import { generateSlug } from '@/utils'

import { TextInput } from '../../../FormElements/TextInput'

interface ICategoryFormInputs {
  name: string
  slug: string
}

export const CategoryForm = () => {
  const {
    register,
    formState: { errors },
    control,
    resetField,
    handleSubmit,
  } = useForm<ICategoryFormInputs>()

  const {
    formDialog,
    setFormDialog,
    categories,
    createCategoryTuple: [createCategory, { loading: createCategoryLoading }],
    updateCategoryTuple: [updateCategory, { loading: updateCategoryLoading }],
  } = useCategories()

  const [slugControlled, setSlugControlled] = useState(false)

  if (formDialog.state === 'closed') return null

  if (formDialog.state === 'loading')
    return <Spinner2Icon className="m-auto h-8 w-8 animate-infinite-spin text-white" />

  const categoryData = formDialog.categoryId
    ? (categories.find((category) => category.id === formDialog.categoryId) as DashboardCategoryFragment)
    : null

  const handleClose = () => setFormDialog({ state: 'closed' })

  const onSubmit: SubmitHandler<ICategoryFormInputs> = async (data) => {
    if (categoryData) {
      updateCategory({
        variables: {
          id: categoryData.id,
          updateCategoryInput: {
            name: data.name,
            ...(data.slug ? { slug: data.slug } : {}),
          },
        },
        update: (cache, { data }) => {
          const cacheData: DashboardCategoriesQuery | null = cache.readQuery({
            query: dashboardQueries.CATEGORIES,
          })

          if (!cacheData || !data?.updateCategory) return

          cache.writeQuery({
            query: dashboardQueries.CATEGORIES,
            data: {
              ...cacheData,
              categories: cacheData.categories.map((category) =>
                category.id === data.updateCategory.id ? { ...category, ...data.updateCategory } : category,
              ),
            },
          })

          handleClose()
        },
      })
    } else {
      createCategory({
        variables: {
          createCategoryInput: {
            name: data.name,
            ...(data.slug ? { slug: data.slug } : {}),
          },
        },
        update: (cache, { data }) => {
          const cacheData: DashboardCategoriesQuery | null = cache.readQuery({
            query: dashboardQueries.CATEGORIES,
          })

          if (!cacheData || !data?.createCategory) return

          cache.writeQuery({
            query: dashboardQueries.CATEGORIES,
            data: {
              ...cacheData,
              categories: cacheData.categories.concat({ ...data.createCategory, articlesCount: 0 }),
            },
          })

          handleClose()
        },
      })
    }
  }

  return (
    <>
      {(createCategoryLoading || updateCategoryLoading) && (
        <div className="absolute flex h-full w-full items-center justify-center">
          <Spinner2Icon className={twMerge('h-8 w-8 animate-infinite-spin text-white')} />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={twMerge('p-6', (createCategoryLoading || updateCategoryLoading) && 'invisible')}
      >
        <p className="mb-6 text-lg font-bold">{categoryData ? 'Update category' : 'Create category'}</p>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">Name</label>
          <TextInput
            errors={[...(errors.name?.message ? [errors.name?.message] : [])]}
            inputProps={{
              placeholder: 'Enter name...',
              defaultValue: categoryData ? categoryData.name : '',
              ...register('name', {
                required: 'This is required',
                minLength: {
                  value: 3,
                  message: 'This input exceed maxLength.',
                },
              }),
            }}
          />
        </div>
        <Controller
          control={control}
          name="name"
          render={({ field: { value } }) =>
            !slugControlled ? (
              <div className="mb-6 flex text-sm text-gray-400">
                <p className="flex grow items-center">Slug: {categoryData ? categoryData.slug : generateSlug(value)}</p>
                <button
                  onClick={() => setSlugControlled(true)}
                  className="ml-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <PenIcon className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">Slug</label>
                <div className="flex">
                  <TextInput
                    errors={[...(errors.slug?.message ? [errors.slug?.message] : [])]}
                    inputProps={{
                      defaultValue: categoryData ? categoryData.slug : generateSlug(value),
                      placeholder: 'Enter slug...',
                      ...register('slug', { required: 'This is required' }),
                    }}
                  />
                  <button
                    onClick={() => {
                      setSlugControlled(false)
                      resetField('slug')
                    }}
                    className="ml-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  >
                    <XmarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )
          }
        />
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:z-10 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:z-10 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  )
}
