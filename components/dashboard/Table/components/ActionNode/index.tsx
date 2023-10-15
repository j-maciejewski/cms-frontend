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

export const ActionNode = ({ text, Icon, ...rest }: IActionProps) => {
  return (
    <Component
      className="ml-auto inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:z-10 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white "
      {...rest}
    >
      {text}
      {Icon && <Icon className="ml-3 h-3 w-3" />}
    </Component>
  )
}
