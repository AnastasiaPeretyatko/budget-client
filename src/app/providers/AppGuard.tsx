import { PUBLIC_ROUTES } from '@/common/router.config'
import { RootState } from '@/common/store.config'
import { setIsAuth } from '@/entities/auth/api/auth.slice';
import { NextComponentType, NextPageContext } from 'next';
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'

type AppGuardProps = {
  Component: NextComponentType<NextPageContext, unknown, unknown>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
}

export function AppGuard({ Component, pageProps }: AppGuardProps) {
  const router = useRouter()
  const { isAuth, isLoading } = useSelector((state: RootState) => state.auth)

  const isPublic = PUBLIC_ROUTES.includes(router.pathname)

  const token = useMemo(() => {
    return localStorage.getItem('token')
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token && !isPublic) {
      setIsAuth(true)

    }
    if (!isLoading && !isAuth && !isPublic && !token) {
      router.replace(`/login?redirect=${router.pathname}`)
    }
  }, [isAuth, isLoading, isPublic, router, router.pathname])

  if (!isPublic && isLoading) {
    return <h1>Loading...</h1>
  }

  if (!isAuth && !isPublic && !token) {
    return null
  }

  return <Component {...pageProps} />
}
