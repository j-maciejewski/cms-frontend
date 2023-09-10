import { ReactNode, SVGProps } from 'react'

import { FilterOperators, FilterTypes } from '@/utils'

export interface ITableColumn {
  title?: string
  key: string
  dataIndex: string
  render?: (value?: any) => ReactNode
  isHidden?: boolean
  isTextIndexed?: boolean
}

export interface ITableFilter {
  filterType: FilterTypes
  fieldKey: string
  label: string
  operator: FilterOperators
  options: {
    value: string
    label: string
  }[]
  loading: boolean
  error: boolean
}

export interface ITableRow extends Partial<Record<string, any>> {}

export type IActionProps = {
  text: string
  Icon?: (props: SVGProps<SVGElement>) => ReactNode
} & (
  | {
      href: string
    }
  | {
      onClick: () => void
    }
  | {}
)
