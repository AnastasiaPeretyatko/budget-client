import PrivateLayout from '@/app/layouts/PrivateLayout'
import { NO_WORKSPACE_ROUTES, PUBLIC_ROUTES } from '@/common/router.config'
import { AppDispatch, RootState } from '@/common/store.config'
import { setToken, setIsLoading } from '@/entities/auth/api/auth.slice';
import { setActiveWorkspace } from '@/entities/workspace/api/workspace.slice';
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
  const { activeWorkspaceId } = useSelector((state: RootState) => state.workspaces)

  const isPublic = PUBLIC_ROUTES.includes(router.pathname)
  const requiresWorkspace = !isPublic && !NO_WORKSPACE_ROUTES.includes(router.pathname)

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
      dispatch(setIsLoading(false));
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
    return <LoadingComponent/>
  }

  if (isPublic) {
    return <Component {...pageProps} />
  }

  return (
    <PrivateLayout>
      <Component {...pageProps} />
    </PrivateLayout>
  )
}
