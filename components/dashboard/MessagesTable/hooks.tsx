import { useMemo } from 'react'

import { ReplyIcon, TrashIcon } from '@/components/icons'

import { OptionsCell } from '../Table/components'
import { ITableColumn, ITableFilter } from '../Table/types'
import { MessagesTableHeadersKeys } from './consts'

export const useColumns = () => {
  const { ID, NAME, EMAIL, CONTENT, MANAGEMENT } = MessagesTableHeadersKeys

  const columns: ITableColumn[] = useMemo(
    () => [
      {
        title: 'Name',
        key: NAME,
        dataIndex: NAME,
        render: (title: string) => (
          <p className="whitespace-nowrap font-medium text-gray-800 dark:text-white">{title}</p>
        ),
      },
      {
        title: 'Email',
        key: EMAIL,
        dataIndex: EMAIL,
      },
      {
        title: 'Content',
        key: CONTENT,
        dataIndex: CONTENT,
        render: (content: string) => (
          <p
            className="overflow-hidden"
            style={{
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box',
              // @ts-ignore
              textWrap: 'balance',
            }}
          >
            {content}
          </p>
        ),
      },
      {
        key: 'MANAGEMENT',
        dataIndex: MANAGEMENT,
        render: ({ id }: { id: string }) => (
          <OptionsCell
            actions={[
              {
                text: 'Reply',
                Icon: ReplyIcon,
                handleClick: () => {},
              },
              {
                text: 'Delete',
                Icon: TrashIcon,
                handleClick: () => {},
              },
            ]}
          />
        ),
      },
    ],
    [],
  )

  return columns
}

export const useFilters = () => {
  const filters: ITableFilter[] = []

  return filters
}
