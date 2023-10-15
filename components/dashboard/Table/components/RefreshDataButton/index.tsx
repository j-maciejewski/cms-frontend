import { RotateIcon } from '@/components/icons'

interface IRefreshDataButton {
  handleRefetch: () => void
}

export const RefreshDataButton = ({ handleRefetch }: IRefreshDataButton) => {
  return (
    <button
      onClick={handleRefetch}
      className="border-gray inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white"
    >
      Refresh
      <RotateIcon className="ml-2 h-3 w-3" />
    </button>
  )
}
