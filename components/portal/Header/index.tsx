import Image from 'next/image'

import { Navbar } from '../Navbar'
import { SearchArticlesForm } from '../SearchArticlesForm'

export const Header = () => {
  return (
    <div className="flex items-center mx-4 my-4">
      <Image src="/joel.gif" height={60} width={250} alt="logo" priority={true} />
      <div className="grow" />
      <Navbar />
      <SearchArticlesForm />
    </div>
  )
}
