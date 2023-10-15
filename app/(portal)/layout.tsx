import '../globals.css'
import { Inter } from 'next/font/google'
import { twMerge } from 'tailwind-merge'

import { Aside, Footer, Header } from '@/components/portal'
import { CategoriesProvider, DisplayModeProvider, RoutesProvider } from '@/context'
import { CategoriesQuery, CategoriesQueryVariables } from '@/gql/graphql'
import { getClient } from '@/lib/client'
import { portalQueries } from '@/services'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { data: categoriesData, error: categoriesError } = await getClient().query<
    CategoriesQuery,
    CategoriesQueryVariables
  >({
    query: portalQueries.GET_CATEGORIES,
  })

  if (categoriesError) {
    return <>{JSON.stringify(categoriesError)}</>
  }

  if (!categoriesData) return <></>

  return (
    <body className={twMerge(inter.className, 'bg-[#F7F7F7]')}>
      <CategoriesProvider categories={categoriesData.categories}>
        <RoutesProvider>
          <DisplayModeProvider>
            <div className="mx-auto flex min-h-screen max-w-[1200px] flex-col">
              <Header />
              <div className="m-4 grid grow gap-5 overflow-hidden lg:grid-cols-[70%_30%]">
                <main>{children}</main>
                <Aside />
              </div>
              <Footer />
            </div>
          </DisplayModeProvider>
        </RoutesProvider>
      </CategoriesProvider>
    </body>
  )
}
