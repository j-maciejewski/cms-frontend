import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface ITextArea {
  errors?: string[] | null
  textareaProps?: ComponentProps<'textarea'>
}

export const TextArea = ({ errors, textareaProps }: ITextArea) => {
  return (
    <div className="relative flex w-full rounded-lg">
      <textarea
        autoComplete="off"
        {...textareaProps}
        className={twMerge(
          'block w-full rounded-lg border border-gray-200 p-2 text-sm text-gray-500 hover:text-gray-700 focus:outline-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
          textareaProps?.className,
        )}
      />
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
