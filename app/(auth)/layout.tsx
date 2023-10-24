'use client'

import './globals.css'
import { useQuery } from '@apollo/client'
import { redirect } from 'next/navigation'

import { SpinnerIcon } from '@/components/icons'
import { LoginProvider } from '@/context/dashboard/'
import { ActiveUserQuery, ActiveUserQueryVariables } from '@/gql/graphql'
import { dashboardQueries } from '@/services'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const {
    data: activeUserData,
    loading: activeUserLoading,
    error: activeUserError,
  } = useQuery<ActiveUserQuery, ActiveUserQueryVariables>(dashboardQueries.ACTIVE_USER)

  const getContent = () => {
    if (activeUserLoading)
      return (
        <div className="grid h-full place-items-center">
          <SpinnerIcon className="h-20 w-20 animate-spin fill-sky-600 text-white dark:text-gray-600" />
        </div>
      )

    if (activeUserData) return <></>

    return (
      <LoginProvider>
        <div className="min-w-[350px] rounded-lg bg-white p-5 shadow-2xl">{children}</div>
      </LoginProvider>
    )
  }

  if (activeUserData) {
    redirect('/dashboard')
  }

  return <body className="grid min-h-screen place-content-center">{getContent()}</body>
}
