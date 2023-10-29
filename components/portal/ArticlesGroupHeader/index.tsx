'use client'

import { useCategories } from '@/context/portal'

import { DisplayModeButtons } from '../DisplayModeButtons'

type CategorySlugProps = { slug: string }
type LabelProps = { label: string }

type IArticlesGroupHeader = {
  hideDisplayModeButtons?: Boolean
} & (CategorySlugProps | LabelProps)

export const ArticlesGroupHeader = (props: IArticlesGroupHeader) => {
  const { categories } = useCategories()

  let label
  if ('slug' in props) {
    label = categories.find((category) => category.slug === props.slug)?.name
  } else {
    label = props.label
  }

  return (
    <div className="mb-6 flex justify-between">
      <h6 className="border-l-4 border-primary pl-4 text-lg font-medium tracking-wider">{label}</h6>
      {!props.hideDisplayModeButtons && <DisplayModeButtons />}
    </div>
  )
}
