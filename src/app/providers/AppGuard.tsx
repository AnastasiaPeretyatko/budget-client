import PrivateLayout from '@/app/layouts/PrivateLayout'
import { NO_WORKSPACE_ROUTES, PUBLIC_ROUTES } from '@/shared/config/routes'
import { AppDispatch, RootState } from '@/app/store'
import { setToken, setIsLoading, verifyTokenThunk } from '@/entities/auth';
import { setActiveWorkspace } from '@/entities/workspace';
import LoadingAnimation from '@/shared/assets/animated/LoadingComponent';
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
  const { isLoading, token, isServerAvailable } = useSelector((state: RootState) => state.auth)
  const { activeWorkspaceId } = useSelector((state: RootState) => state.workspaces)

  const isPublic = PUBLIC_ROUTES.includes(router.pathname)
  const isWorkspacePage = NO_WORKSPACE_ROUTES.includes(router.pathname)
  const requiresWorkspace = !isPublic && !isWorkspacePage

  useEffect(() => {
    if (!token && isLoading) {
      const localToken = localStorage.getItem('token')

      if (!localToken) {
        if (!isPublic) router.push('/login')
        dispatch(setIsLoading(false))
        return
      }

      dispatch(setToken(localToken))
      dispatch(verifyTokenThunk())
        .unwrap()
        .then(() => {
          if (isPublic) router.push('/dashboard')
        })
        .catch((reason) => {
          if (reason !== 'unavailable') {
            localStorage.clear()
            router.push('/login')
          }
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublic, router.pathname, token])

  useEffect(() => {
    if (isLoading || isPublic) return

    const storedWorkspaceId = localStorage.getItem('workspaceId')

    if (storedWorkspaceId && !activeWorkspaceId) {
      dispatch(setActiveWorkspace(storedWorkspaceId))
    }

    if (!storedWorkspaceId && requiresWorkspace) {
      router.push('/workspaces')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isPublic, requiresWorkspace, activeWorkspaceId])

  if (isLoading) {
    return <LoadingAnimation/>
  }

  if (!isServerAvailable) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 16 }}>
        <p style={{ fontSize: 18, fontWeight: 600 }}>Server unavailable</p>
        <p style={{ color: '#888' }}>Could not connect to the server. Please try again later.</p>
        <button onClick={() => window.location.reload()} style={{ padding: '8px 20px', cursor: 'pointer' }}>
          Retry
        </button>
      </div>
    )
  }

  if (isPublic || isWorkspacePage) {
    return <Component {...pageProps} />
  }

  return (
    <PrivateLayout>
      <Component {...pageProps} />
    </PrivateLayout>
  )
}
