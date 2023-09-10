'use client'

import { LexicalEditor } from '@/components/dashboard'
import { useCategories } from '@/context/CategoriesProvider'
import { Category } from '@/types'
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface INewArticleForm {
  title: string
  leadImage: File | undefined
  category: Category['_id']
  content: string
}

export default function () {
  const { categories } = useCategories()

  const [file, setFile] = useState<string | undefined>()
  const handleClearLeadFile = () => {
    setFile(undefined)
  }
  const handleChangeLeadFile = (evt: ChangeEvent<HTMLInputElement>) => {
    const _file = evt.target?.files?.[0]

    if (!_file) return

    setFile(URL.createObjectURL(_file))
  }

  const [form, setForm] = useState<INewArticleForm>({
    title: '',
    leadImage: undefined,
    category: '',
    content: '',
  })

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = evt.target

    setForm((prev) => ({ ...prev, [name]: value }))
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

  return (
    <>
      <div className="font-medium mb-4 text-[30px]">Create article</div>
      <div className="mb-3">
        <label htmlFor="leadImage" className="block mb-2 text-sm font-medium">
          Lead Image
        </label>
        <div className="relative w-max mx-auto dark:bg-gray-700 rounded-lg">
          <input
            ref={inputRef}
            id="leadImage"
            className="hidden absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleChangeLeadFile}
          />
          {file && (
            <button className="absolute top-3 right-3 z-20" onClick={handleClearLeadFile}>
              ❌
            </button>
          )}
          <label
            htmlFor="leadImage"
            className={twMerge(
              'input w-full h-full absolute top-0 left-0 rounded-lg grid place-items-center dark:bg-gray-700 cursor-pointer hover:bg-gray-400',
              !file || dragActive ? 'bg-gray-400 opacity-25' : 'opacity-0',
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {(dragActive || !file) && <p className="text-lg font-medium">Click here or drag and drop your image</p>}
          </label>
          {
            <img
              className={twMerge(
                'input rounded-lg z-20 mt-2 mx-auto h-[400px] aspect-[16/9] object-cover',
                !file && 'invisible',
              )}
              src={file}
            />
          }
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="block mb-2 text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="text-sm rounded-lg block w-full p-2.5"
          placeholder="Enter article title..."
          autoComplete="off"
          onChange={handleChange}
          required
        />
        <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
          Slug: {encodeURI(form.title.toLocaleLowerCase().replace(/\s+/g, '-'))}
        </p>
      </div>
      {/* <div className="mb-3">
        <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-90">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-200"
          autoComplete="off"
          value={form.title.toLocaleLowerCase().replace(/\s+/g, '-')}
          disabled
          required
        />
      </div> */}
      <div className="mb-3">
        <label htmlFor="category" className="block mb-2 text-sm font-medium">
          Category
        </label>
        <select
          onChange={handleChange}
          id="category"
          name="category"
          className="text-sm rounded-lg block w-full p-2.5"
          defaultValue="PLACEHOLDER"
        >
          <option value="PLACEHOLDER" disabled hidden>
            Choose category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="countries" className="block mb-2 text-sm font-medium">
          Content
        </label>
        <div className="bg-gray-700  border-gray-800 text-gray-900 text-sm rounded-lg block w-full p-2.5">
          <LexicalEditor isEditing={true} />
        </div>
      </div>
    </>
  )
}
