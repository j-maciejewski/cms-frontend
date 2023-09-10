'use client'

import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'

import { ApolloWrapper } from '@/ApolloWrapper'
import { Main, Navbar, Sidebar } from '@/components/dashboard'
import { CategoriesProvider } from '@/context'
import { SidebarProvider } from '@/context/SidebarProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

// const client = new ApolloClient({
//   uri: 'http://localhost:3001/graphql',
//   cache: new InMemoryCache(),
// })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <ThemeProvider attribute="class">
            <SidebarProvider>
              <CategoriesProvider>
                <div className="flex min-h-screen w-full">
                  <Navbar />
                  <div className="pt-[60px] flex w-full">
                    <Sidebar />
                    <Main>{children}</Main>
                  </div>
                </div>
              </CategoriesProvider>
            </SidebarProvider>
          </ThemeProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}