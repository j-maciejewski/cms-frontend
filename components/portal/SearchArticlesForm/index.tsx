'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { MagnifierIcon } from '@/components/icons'

export const SearchArticlesForm = () => {
  const router = useRouter()

  const [query, setQuery] = useState('')

  const handleChangeQuery = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(evt.target.value)
  }

  const handleSearchQuery = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (query.trim().length === 0) return

    router.push(`/search?q=${query}`)
  }

  return (
    <>
      <form className="relative text-gray-600" onSubmit={handleSearchQuery}>
        <input
          type="search"
          name="serch"
          placeholder="Search"
          className="h-10 rounded-full bg-white px-5 pr-10 text-sm focus:outline-primary/50"
          value={query}
          onChange={handleChangeQuery}
          autoComplete="off"
        />
        <button type="submit" className="absolute right-0 top-0 mx-4 mt-3">
          <MagnifierIcon className="h-4 w-4" />
        </button>
      </form>
    </>
  )
}
