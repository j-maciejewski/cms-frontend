import { ApolloWrapper } from '@/ApolloWrapper'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ApolloWrapper>{children}</ApolloWrapper>
    </html>
  )
}
