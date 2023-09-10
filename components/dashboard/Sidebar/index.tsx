import { twMerge } from 'tailwind-merge'

import { ChartIcon, CogIcon, InboxIcon, LayersIcon, PageIcon, UsersIcon } from '@/components/icons'
import { DASHBOARD_ROUTES } from '@/consts/routes'
import { useSidebar } from '@/context/SidebarProvider'

import { SidebarItem } from '../SidebarItem'

export const Sidebar = () => {
  const { isSidebarOpen } = useSidebar()

  return (
    <>
      <aside
        className={twMerge('fixed top-0 left-0 pt-[60px] h-screen', isSidebarOpen ? 'w-64' : 'w-16')}
        aria-label="Sidebar"
        style={{ transition: 'width .1s ease-in-out' }}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <SidebarItem href={DASHBOARD_ROUTES.HOME} Icon={ChartIcon} name="Dashboard" />
            <SidebarItem href={DASHBOARD_ROUTES.ARTICLES} Icon={PageIcon} name="Articles" />
            <SidebarItem href={DASHBOARD_ROUTES.CATEGORIES} Icon={LayersIcon} name="Categories" />
            <SidebarItem href={DASHBOARD_ROUTES.USERS} Icon={UsersIcon} name="Users" />
            <SidebarItem href={DASHBOARD_ROUTES.INBOX} Icon={InboxIcon} name="Inbox" badge="3" />
            <SidebarItem href={DASHBOARD_ROUTES.SETTINGS} Icon={CogIcon} name="Settings" />
          </ul>
        </div>
      </aside>
    </>
  )
}
