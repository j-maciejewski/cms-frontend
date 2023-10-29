import { twMerge } from 'tailwind-merge'

import { ChartIcon, CogIcon, GlobeIcon, InboxIcon, LayersIcon, PageIcon, UsersIcon } from '@/components/icons'
import { DASHBOARD_ROUTES, PORTAL_ROUTES } from '@/consts'
import { useSidebar } from '@/context/dashboard'

import { SidebarItem } from './components'

export const Sidebar = () => {
  const { isSidebarOpen } = useSidebar()

  return (
    <>
      <aside
        className={twMerge('fixed left-0 top-0 h-screen pt-[60px]', isSidebarOpen ? 'w-64' : 'w-16')}
        style={{ transition: 'width .1s ease-in-out' }}
      >
        <div className="h-full overflow-y-auto bg-gray-200 px-3 py-4 dark:bg-gray-800">
          <ul className="flex h-full flex-col space-y-2 font-medium">
            <SidebarItem href={DASHBOARD_ROUTES.HOME} Icon={ChartIcon} name="Dashboard" />
            <SidebarItem href={DASHBOARD_ROUTES.ARTICLES} Icon={PageIcon} name="Articles" />
            <SidebarItem href={DASHBOARD_ROUTES.CATEGORIES} Icon={LayersIcon} name="Categories" />
            <SidebarItem href={DASHBOARD_ROUTES.USERS} Icon={UsersIcon} name="Users" />
            <SidebarItem href={DASHBOARD_ROUTES.INBOX} Icon={InboxIcon} name="Inbox" badge="3" />
            <SidebarItem href={DASHBOARD_ROUTES.SETTINGS} Icon={CogIcon} name="Settings" />
            <div className="grow" />
            <SidebarItem href={PORTAL_ROUTES.HOME} Icon={GlobeIcon} name="Browse" />
          </ul>
        </div>
      </aside>
    </>
  )
}
