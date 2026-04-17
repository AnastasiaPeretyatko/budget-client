/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AppGuard } from '@/app/providers/AppGuard';
import { store } from '@/common/store.config';
import { Provider as ChakraProvider } from '@/components/ui/provider';
import { Toaster } from '@/components/ui/toaster';
import moment from 'moment';
import type { AppProps } from "next/app";
import { Provider } from 'react-redux';

moment.locale('ru');

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AppGuard Component={Component} pageProps={pageProps}/>
        <Toaster />
      </ChakraProvider>
    </Provider>
  )
}
