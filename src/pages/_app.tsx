import { SessionProvider } from 'next-auth/react'
import { SnackbarProvider } from 'notistack'
import '../styles/global.css'

export default function App({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <SessionProvider session={session}>
      <SnackbarProvider maxSnack={3}>
        <Component {...pageProps} />
      </SnackbarProvider>
    </SessionProvider>
  )
}
