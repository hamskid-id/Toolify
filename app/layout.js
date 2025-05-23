import { Poppins } from 'next/font/google'
import './globals.css'
import NextTopLoader from 'nextjs-toploader'
// import ReactQueryProvider from '@/utils/context/ReactQueryProvider'
import { Toaster } from '@/components/ui/sonner'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata = {
  title: 'Toolify',
  description:
    'Task Mangemnt plartform for users',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${poppins.variable} antialiased`}>
        {/* <ReactQueryProvider> */}
          <NextTopLoader color='#0096FF' showSpinner={false} />
          {children}
        {/* </ReactQueryProvider> */}
        <Toaster richColors />
      </body>
    </html>
  )
}
