import { ComponentProps } from 'react'

interface ITextInput {
  Icon?: (props: any) => JSX.Element
  errors?: string[] | null
  inputProps?: ComponentProps<'input'>
}

export const TextInput = ({ Icon, errors, inputProps }: ITextInput) => {
  return (
    <div className="relative flex border border-gray-300 rounded-lg">
      {Icon && (
        <span className="inline-flex items-center px-3 text-sm bg-gray-200 text-gray-900 rounded-l-md">
          <Icon className="w-4 h-4 fill-gray-500" />
        </span>
      )}
      <input
        className="bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        autoComplete="off"
        {...inputProps}
      />
      {errors && (
        <div className="absolute top-[50%] translate-y-[-50%] right-3 group">
          <div className="hidden group-hover:block absolute text-xs w-max mb-2 p-2 bottom-[100%] left-3 translate-x-[-50%] bg-gray-100 border border-gray-300 rounded-lg">
            {errors.map((err, idx) => (
              <p key={idx}>{err}</p>
            ))}
          </div>
          <div className="text-white select-none text-xs bg-red-400 w-5 h-5 grid place-content-center rounded-2xl">
            !
          </div>
        </div>
      )}
    </div>
  )
}
