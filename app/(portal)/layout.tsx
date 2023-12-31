import '../globals.css'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { twMerge } from 'tailwind-merge'

import { Aside, Footer, Header } from '@/components/portal'
import { CategoriesProvider, DisplayModeProvider } from '@/context/portal'
import { PublicCategoriesQuery, PublicCategoriesQueryVariables } from '@/gql/graphql'
import { getClient } from '@/lib/client'
import { publicQueries } from '@/services'

import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard | Joel CMS',
  description: 'Dashboard for Joel portal',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { data: categoriesData, error: categoriesError } = await getClient().query<
    PublicCategoriesQuery,
    PublicCategoriesQueryVariables
  >({
    query: publicQueries.PUBLIC_CATEGORIES,
  })

  if (categoriesError) {
    return <>{JSON.stringify(categoriesError)}</>
  }

  if (!categoriesData) return <></>

  return (
    <body className={twMerge(inter.className, 'bg-[#F7F7F7]')}>
      <CategoriesProvider categories={categoriesData.publicCategories}>
        <DisplayModeProvider>
          <div className="mx-auto flex min-h-screen max-w-[1300px] flex-col">
            <Header />
            <div className="m-4 grid grow gap-5 overflow-hidden lg:grid-cols-[70%_30%]">
              <main>
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </main>
              <Aside />
            </div>
            <Footer />
          </div>
        </DisplayModeProvider>
      </CategoriesProvider>
      <ToastContainer />
    </body>
  )
}
