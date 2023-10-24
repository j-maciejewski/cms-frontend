'use client'

import './globals.css'
import { useQuery } from '@apollo/client'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Main, Navbar, Sidebar } from '@/components/dashboard'
import { Spinner2Icon } from '@/components/icons'
import { ActiveUserProvider, SidebarProvider } from '@/context/dashboard'
import { ActiveUserQuery, ActiveUserQueryVariables } from '@/gql/graphql'
import { dashboardQueries } from '@/services'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const {
    data: activeUserData,
    loading: activeUserLoading,
    error: activeUserError,
  } = useQuery<ActiveUserQuery, ActiveUserQueryVariables>(dashboardQueries.ACTIVE_USER)

  const getContent = () => {
    if (activeUserLoading) return <Spinner2Icon className="m-auto h-16 w-16 animate-infinite-spin text-white" />

    if (activeUserError || !activeUserData) return <></>

    return (
      <ActiveUserProvider activeUser={activeUserData.activeUser}>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <Navbar />
            <div className="flex w-full pt-[60px]">
              <Sidebar />
              <Main>{children}</Main>
            </div>
          </div>
        </SidebarProvider>
      </ActiveUserProvider>
    )
  }

  if (activeUserError || !activeUserData) {
    redirect('/login')
  }

  return (
    <body className={inter.className}>
      <ThemeProvider attribute="class">{getContent()}</ThemeProvider>
      <ToastContainer />
    </body>
  )
}
