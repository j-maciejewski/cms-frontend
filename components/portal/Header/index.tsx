import Image from 'next/image'

import { Navbar } from '../Navbar'
import { SearchArticlesForm } from '../SearchArticlesForm'

export const Header = () => {
  return (
    <div className="mx-4 my-4 flex items-center">
      <Image src="/joel.gif" height={60} width={250} alt="logo" priority={true} className="h-[80px] w-auto" />
      <div className="grow" />
      <Navbar />
      <SearchArticlesForm />
    </div>
  )
}
