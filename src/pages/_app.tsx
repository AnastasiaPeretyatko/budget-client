import { store } from '@/common/store.config';
import { Provider as ChakraProvider } from '@/components/ui/provider';
import { AuthProvider } from '@/entities/auth/auth.context';
import moment from 'moment';
import type { AppProps } from "next/app";
import { Provider } from 'react-redux';

moment.locale('ru');

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
      </Provider>
    </AuthProvider>
  )
}
