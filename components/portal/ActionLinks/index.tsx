import Link from 'next/link'

export const ActionLinks = () => {
  return (
    <div className="flex justify-center gap-2 text-xs text-gray-400">
      <Link href="/contact">
        Contact
      </Link>
      <span className="select-none">•</span>
      
      <Link href="/login">
      Login
      </Link>
    </div>
  )
}
