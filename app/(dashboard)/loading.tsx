import { Spinner2Icon } from '@/components/icons'

export default function Loading() {
  return (
    <div className="grid h-full place-items-center">
      <Spinner2Icon className="m-auto h-16 w-16 animate-infinite-spin text-white" />
    </div>
  )
}
