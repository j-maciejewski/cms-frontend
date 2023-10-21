'use client'

import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Main, Navbar, Sidebar } from '@/components/dashboard'
import { SidebarProvider } from '@/context/SidebarProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <body className={inter.className}>
      <ThemeProvider attribute="class">
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <Navbar />
            <div className="flex w-full pt-[60px]">
              <Sidebar />
              <Main>{children}</Main>
            </div>
          </div>
        </SidebarProvider>
      </ThemeProvider>
      <ToastContainer />
    </body>
  )
}
