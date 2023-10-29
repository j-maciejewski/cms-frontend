'use client'

import './globals.css'
import { useQuery } from '@apollo/client'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { twMerge } from 'tailwind-merge'

import { Main, Navbar, Sidebar } from '@/components/dashboard'
import { ActiveUserProvider, SidebarProvider } from '@/context/dashboard'
import { ActiveUserQuery, ActiveUserQueryVariables } from '@/gql/graphql'
import { dashboardQueries } from '@/services'

import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const {
    data: activeUserData,
    loading: activeUserLoading,
    error: activeUserError,
  } = useQuery<ActiveUserQuery, ActiveUserQueryVariables>(dashboardQueries.ACTIVE_USER)

  if (activeUserError) {
    redirect('/login')
  }

  const getContent = () => {
    if (activeUserLoading) return <Loading />

    if (!activeUserData) return <></>

    return (
      <ActiveUserProvider activeUser={activeUserData.activeUser}>
        <SidebarProvider>
          <div className="flex min-h-screen w-full overflow-auto">
            <Navbar />
            <div className="flex w-full overflow-auto pt-[60px]">
              <Sidebar />
              <Main>{children}</Main>
            </div>
          </div>
        </SidebarProvider>
      </ActiveUserProvider>
    )
  }

  return (
    <body className={twMerge(inter.className, 'min-h-screen overflow-auto')}>
      <ThemeProvider attribute="class">{getContent()}</ThemeProvider>
      <ToastContainer />
    </body>
  )
}
