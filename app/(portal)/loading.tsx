import { SpinnerIcon } from '@/components/icons'

export default function Loading() {
  return (
    <div className="grid h-full place-items-center">
      <SpinnerIcon className="h-16 w-16 animate-spin fill-sky-600 text-gray-200 dark:text-gray-600" />
    </div>
  )
}
