/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AppGuard } from '@/app/providers/AppGuard';
import { store } from '@/app/store';
import { Provider as ChakraProvider } from '@/shared/ui/provider';
import { Toaster } from '@/shared/ui/toaster';
import moment from 'moment';
import type { AppProps } from "next/app";
import Head from 'next/head';
import { Provider } from 'react-redux';

moment.locale('ru');

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>FinFlow</title>
        <meta
          name="description"
          content="Управляйте личным бюджетом и накоплениями."
        />
        <meta property="og:title" content="FinFlow" />
        <meta
          property="og:description"
          content="Управляйте личным бюджетом и накоплениями."
        />
      </Head>
      <ChakraProvider forcedTheme="light">
        <AppGuard Component={Component} pageProps={pageProps}/>
        <Toaster />
      </ChakraProvider>
    </Provider>
  )
}
