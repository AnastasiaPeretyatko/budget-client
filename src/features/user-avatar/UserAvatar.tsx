import { RootState, useAppDispatch } from '@/app/store'
import { resetApiCache } from '@/app/resetApiCache'
import { deleteToken, setIsAuth } from '@/entities/auth'
import { clearActiveWorkspace } from '@/entities/workspace'
import { setSelectedPeriodId } from '@/entities/billing-period'
import { Avatar, Menu, Portal } from "@chakra-ui/react"
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const UserAvatar = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { user } = useSelector((state: RootState) => state.auth)

  const handleClickLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    // пространство и период принадлежат пользователю: следующий вход выбирает их заново
    localStorage.removeItem('workspaceId')
    localStorage.removeItem('period')
    dispatch(deleteToken())
    dispatch(setIsAuth(false))
    dispatch(clearActiveWorkspace())
    dispatch(setSelectedPeriodId(null))
    // данные предыдущего пользователя не должны остаться в кэше
    dispatch(resetApiCache())
    router.push('/login')
  }

  if (!user) {
    return
  }

  return (
    <Menu.Root positioning={{ placement: "bottom-end" }}>
      <Menu.Trigger rounded="full" focusRing="outside">
        <Avatar.Root size="sm">
          <Avatar.Fallback name={`${user.firstName! + user.lastName!}`} />
          <Avatar.Image src={`${user.firstName! + user.lastName!}`} />
        </Avatar.Root>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="logout" onClick={handleClickLogout}color={'red.700'}><LogOut size={'14px'}/> Выйти</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default UserAvatar
