import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface IOption extends ComponentProps<'option'> {
  value: string
  label?: string
}

interface ISelect extends ComponentProps<'select'> {
  Icon?: (props: any) => JSX.Element
  errors?: string[] | null
  selectProps?: ComponentProps<'select'>
  options: IOption[]
}

export const Select = ({ Icon, errors, selectProps, options }: ISelect) => {
  return (
    <div className="relative flex w-full rounded-lg">
      {Icon && (
        <span className="inline-flex items-center rounded-l-md bg-gray-200 px-3 text-sm text-gray-900">
          <Icon className="h-4 w-4 fill-gray-500" />
        </span>
      )}
      <select
        autoComplete="off"
        {...selectProps}
        className={twMerge(
          'block w-full rounded-lg border border-gray-200 p-2 text-sm text-gray-500 hover:text-gray-700 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
          selectProps?.className,
        )}
      >
        {options.map(({ label, ...optionProps }, idx) => (
          <option key={idx} {...optionProps}>
            {label}
          </option>
        ))}
      </select>
      {errors && errors.length > 0 && (
        <div className="group absolute right-3 top-[50%] translate-y-[-50%]">
          <div className="absolute -right-3 bottom-[100%] mb-2 hidden w-max -translate-y-1 rounded-lg border border-gray-200 bg-red-400 p-2 text-xs group-hover:block">
            {errors.map((err, idx) => (
              <p key={idx}>{err}</p>
            ))}
          </div>
          <div className="grid h-5 w-5 select-none place-content-center rounded-2xl bg-red-400 text-xs text-white">
            !
          </div>
        </div>
      )}
    </div>
  )
}
