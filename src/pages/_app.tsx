import React from "react";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import "../styles/global.css";
import * as locales from "@mui/material/locale";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import 'moment/locale/pt-br'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  type SupportedLocales = keyof typeof locales;
  const [locale, setLocale] = React.useState<SupportedLocales>("ptBR");
  const theme = useTheme();

  const themeWithLocale = React.useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme]
  );
    
  return (

    <SessionProvider session={session}>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={themeWithLocale}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SnackbarProvider>
    </SessionProvider>
  );
}
