'use client'

import { useQuery } from '@apollo/client'
import { $generateHtmlFromNodes } from '@lexical/html'
import { ChangeEvent, DragEvent, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import { useArticles } from '@/app/(dashboard)/dashboard/articles/ArticlesProvider'
import { LexicalEditor, Select, TextInput } from '@/components/dashboard'
import { PenIcon, Spinner2Icon, XmarkIcon } from '@/components/icons'
import { BasicDashboardCategoriesQuery, BasicDashboardCategoriesQueryVariables } from '@/gql/graphql'
import { dashboardQueries } from '@/services'
import { Category } from '@/types'
import { generateSlug } from '@/utils'

interface IArticleFormInputs {
  title: string
  slug: string
  leadImage: File | undefined
  category: Category['_id']
  content: string
}

export const ArticleForm = () => {
  const {
    formDialog,
    setFormDialog,
    createArticleTuple: [createArticle, { loading: createArticleLoading }],
    updateArticleTuple: [updateArticle, { loading: updateArticleLoading }],
  } = useArticles()

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery<BasicDashboardCategoriesQuery, BasicDashboardCategoriesQueryVariables>(dashboardQueries.BASIC_CATEGORIES)

  const {
    register,
    formState: { errors },
    control,
    resetField,
    handleSubmit,
    setValue,
  } = useForm<IArticleFormInputs>()

  const [slugControlled, setSlugControlled] = useState(false)

  const handleClose = () => setFormDialog({ state: 'closed' })

  const onSubmit: SubmitHandler<IArticleFormInputs> = async (data) => {
    // TODO
    createArticle({
      variables: {
        createArticleInput: {
          title: data.title,
          ...(data.slug ? { slug: data.slug } : {}),
          content: data.content,
          categoryId: data.category,
          leadImage: '1.png',
        },
      },
    })
  }

  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)

  const handleDrag = function (evt: DragEvent) {
    evt.preventDefault()
    evt.stopPropagation()
    if (evt.type === 'dragenter' || evt.type === 'dragover') {
      setDragActive(true)
    } else if (evt.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const [file, setFile] = useState<string | undefined>()

  const handleDrop = function (evt: DragEvent) {
    evt.preventDefault()
    evt.stopPropagation()
    setDragActive(false)
    if (evt.dataTransfer.files && evt.dataTransfer.files[0]) {
      const _file = evt.dataTransfer?.files?.[0]

      if (!_file) return

      setFile(URL.createObjectURL(_file))
    }
  }

  const handleClearLeadFile = () => {
    setFile(undefined)
  }
  const handleChangeLeadFile = (evt: ChangeEvent<HTMLInputElement>) => {
    const _file = evt.target?.files?.[0]

    if (!_file) return

    setFile(URL.createObjectURL(_file))
  }

  if (formDialog.state === 'closed') return null

  if (formDialog.state === 'loading')
    return <Spinner2Icon className="m-auto h-8 w-8 animate-infinite-spin text-white" />

  return (
    <>
      {(createArticleLoading || updateArticleLoading || categoriesLoading) && (
        <div className="absolute flex h-full w-full items-center justify-center">
          <Spinner2Icon className={twMerge('h-8 w-8 animate-infinite-spin text-white')} />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={twMerge('p-6', (createArticleLoading || updateArticleLoading) && 'invisible')}
      >
        <p className="mb-6 text-lg font-bold">{formDialog.articleId ? 'Update article' : 'Create article'}</p>
        <Controller
          control={control}
          name="leadImage"
          render={({ field: { value, onChange } }) => (
            <div className="mb-3">
              <label htmlFor="leadImage" className="mb-2 block text-sm font-medium">
                Lead Image
              </label>
              <div className="relative mx-auto w-max rounded-lg dark:bg-gray-700">
                <input
                  ref={inputRef}
                  id="leadImage"
                  className="absolute left-[50%] top-[50%] hidden translate-x-[-50%] translate-y-[-50%]"
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleChangeLeadFile}
                />
                {file && (
                  <button className="absolute right-3 top-3 z-20" onClick={handleClearLeadFile}>
                    ❌
                  </button>
                )}
                <label
                  htmlFor="leadImage"
                  className={twMerge(
                    'input absolute left-0 top-0 grid h-full w-full cursor-pointer place-items-center rounded-lg hover:bg-gray-400 dark:bg-gray-700',
                    !file || dragActive ? 'bg-gray-400 opacity-25' : 'opacity-0',
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {(dragActive || !file) && (
                    <p className="text-lg font-medium">Click here or drag and drop your image</p>
                  )}
                </label>
                {
                  <img
                    className={twMerge(
                      'input z-20 mx-auto mt-2 aspect-[16/9] h-[400px] rounded-lg object-cover',
                      !file && 'invisible',
                    )}
                    src={file}
                  />
                }
              </div>
            </div>
          )}
        />
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">Title</label>
          <TextInput
            errors={[...(errors.title?.message ? [errors.title?.message] : [])]}
            inputProps={{
              placeholder: 'Enter name...',
              defaultValue: '',
              ...register('title', {
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
          name="title"
          render={({ field: { value } }) =>
            !slugControlled ? (
              <div className="mb-6 flex text-sm text-gray-400">
                <p className="flex grow items-center">Slug: {generateSlug(value)}</p>
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
                      defaultValue: generateSlug(value),
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
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">Category</label>
          <Select
            errors={[...(errors.category?.message ? [errors.category?.message] : [])]}
            options={[
              { value: 'PLACEHOLDER', label: 'Choose category', disabled: true },
              ...(categoriesData?.categories.map((category) => ({
                value: category.id,
                label: category.name,
              })) ?? []),
            ]}
            selectProps={{
              defaultValue: 'PLACEHOLDER',
              ...register('category'),
            }}
          />
        </div>
        <Controller
          control={control}
          name="content"
          render={({ field: { value, onChange } }) => (
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium">Content</label>
              <div className="block w-full rounded-lg border  border-gray-200 bg-white p-2 text-sm text-gray-500 hover:text-gray-700 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <LexicalEditor
                  onChange={(lexicalEditor) => {
                    const htmlString = $generateHtmlFromNodes(lexicalEditor)
                    setValue('content', htmlString)
                  }}
                  value=""
                  isEditing={true}
                />
              </div>
            </div>
          )}
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
