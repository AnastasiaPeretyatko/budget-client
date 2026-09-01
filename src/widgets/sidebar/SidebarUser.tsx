import { Box, HStack, Text } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { LuLogOut } from 'react-icons/lu'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { deleteToken, setIsAuth } from '@/entities/auth'
import BaseAvatar from '@/shared/ui/avatar'
import DropdownMenu from '@/shared/ui/menu'
import { COLOR } from '@/shared/config/colors'
import { useSidebarContext } from './Sidebar'

const SidebarUser = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { collapsed } = useSidebarContext()
  const user = useAppSelector((state) => state.auth.user)

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ')
  const displayName = fullName || user?.email || ''

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    dispatch(deleteToken())
    dispatch(setIsAuth(false))
    router.push('/login')
  }

  const menuItems = useMemo(
    () => [
      {
        value: 'logout',
        label: 'Выйти',
        icon: <LuLogOut />,
        color: COLOR.DANGER_TEXT,
        onClick: handleLogout,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <DropdownMenu
      menuItems={menuItems}
      positioning={{ placement: 'right-end' }}
      minW="200px"
      buttonTrigger={
        <HStack
          justify={collapsed ? 'center' : 'start'}
          px={collapsed ? 0 : 1}
          p={2}
          cursor="pointer"
          _hover={{ bg: 'bg.subtle', borderRadius: 'md' }}
        >
          <BaseAvatar size="sm" name={fullName || undefined} />
          {!collapsed && (
            <>
              <Box width="100%" truncate>{displayName}</Box>
              <Text fontSize="lg" lineHeight={1} color={COLOR.LABEL}>⋮</Text>
            </>
          )}
        </HStack>
      }
    />
  )
}

export default SidebarUser
