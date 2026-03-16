import { Provider } from '@/components/ui/provider';
import { AuthProvider } from '@/entities/auth/auth.context';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  )
}
