import Link from 'next/link'
import { HTMLProps } from 'react'

import { IActionProps } from '../../types'

const Component = (props: HTMLProps<HTMLElement>) => {
  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={props.className}>
        {props.children}
      </Link>
    )
  } else if ('onClick' in props) {
    return (
      <button onClick={props.onClick} className={props.className}>
        {props.children}
      </button>
    )
  } else {
    return <div className={props.className}>{props.children}</div>
  }
}

export const ActionNode = (props: IActionProps) => {
  const { text, Icon, ...rest } = props

  return (
    <Component
      className="button px-4 py-2 text-sm font-medium text-center inline-flex items-center text-gray-500 dark:text-gray-400 bg-white rounded-lg  hover:text-gray-700 focus:z-10 dark:bg-gray-700 dark:hover:text-white dark:hover:bg-gray-700"
      {...rest}
    >
      {text}
      {Icon && <Icon className="w-3 h-3 ml-3" />}
    </Component>
  )
}
