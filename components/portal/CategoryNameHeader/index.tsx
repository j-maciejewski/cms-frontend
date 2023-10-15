'use client'

import { useCategories } from '@/context/CategoriesProvider'

import { DisplayModeButtons } from '../DisplayModeButtons'

interface CategoryNameHeader {
  slug: string
}

export const CategoryNameHeader = ({ slug }: CategoryNameHeader) => {
  const { categories } = useCategories()

  const categoryName = categories.find((category) => category.slug === slug)?.name

  return (
    <div className="flex justify-between">
      <div className="mb-4 text-[20px] font-medium">{categoryName}</div>
      <DisplayModeButtons />
    </div>
  )
}
