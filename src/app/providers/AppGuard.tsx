import { PUBLIC_ROUTES } from '@/common/router.config'
import { AppDispatch, RootState } from '@/common/store.config'
import { setToken, toggleIsLoading } from '@/entities/auth/api/auth.slice';
import LoadingComponent from '@/shared/assets/animated/LoadingComponent';
import { NextComponentType, NextPageContext } from 'next';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

type AppGuardProps = {
  Component: NextComponentType<NextPageContext, unknown, unknown>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
}

export function AppGuard({ Component, pageProps }: AppGuardProps) {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, token } = useSelector((state: RootState) => state.auth)

  const isPublic = PUBLIC_ROUTES.includes(router.pathname)

  useEffect(() => {
    if (!token && isLoading) {
      const localToken = localStorage.getItem('token')

      if (localToken) {
        dispatch(setToken(localToken));
        if (isPublic) {
          router.push('/')
        }
      }

      if (!localToken && !isPublic) {
        router.push('/login')
      }
      dispatch(toggleIsLoading());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublic, router.pathname, token])

  if (isLoading) {
    return <LoadingComponent/>
  }

  return <Component {...pageProps} />
}
