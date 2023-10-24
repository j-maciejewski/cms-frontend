'use client'

import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useContext, useMemo } from 'react'

import { LogoutMutation, LogoutMutationVariables, User } from '@/gql/graphql'
import { dashboardMutations } from '@/services'

interface IActiveUserContext {
  activeUser: Partial<User>
  handleLogout: () => void
}

interface IActiveUserProviderProps {
  activeUser: Partial<User>
  children: ReactNode
}

const ActiveUserProvider = (props: IActiveUserProviderProps) => {
  const { activeUser, ...rest } = props
  const router = useRouter()

  const [logout] = useMutation<LogoutMutation, LogoutMutationVariables>(dashboardMutations.LOGOUT)

  const handleLogout = () =>
    logout().then(() => {
      window.location.replace('/login')
    })

  const value = useMemo(() => ({ activeUser, handleLogout }), [activeUser])

  return <ActiveUserContext.Provider value={value} {...rest} />
}

const useActiveUser = () => {
  const context = useContext(ActiveUserContext)

  if (context === undefined) {
    throw new Error('useActiveUser must be used within a ActiveUserProvider')
  }

  return context
}

const ActiveUserContext = createContext<IActiveUserContext | undefined>(undefined)

export { ActiveUserProvider, useActiveUser }
