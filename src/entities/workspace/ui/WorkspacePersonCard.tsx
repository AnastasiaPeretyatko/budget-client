import { AuthUser } from '@/entities/auth'
import { RootState, useAppDispatch } from '@/app/store'
import { removeWorkspaceUserThunk } from '@/entities/workspace'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseAvatar from '@/shared/ui/avatar'
import BaseModal from '@/shared/ui/modal'
import { HStack, IconButton, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { LuX } from 'react-icons/lu'

type Props = {
  user: AuthUser
}

const WorkspacePersonCard = ({ user }: Props) => {
  const dispatch = useAppDispatch()
  const { currentWorkspace } = useSelector((state: RootState) => state.workspaces)
  const { showSuccessMessage, showErrorMessage } = useNotifications()

  const isOwner = currentWorkspace?.ownerId === user.id

  const displayName = user.firstName || user.lastName
    ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
    : user.email

  const handleRemove = (close: () => void) => {
    dispatch(removeWorkspaceUserThunk(user.id))
      .unwrap()
      .then(() => {
        showSuccessMessage('Пользователь удалён')
        close()
      })
      .catch(() => showErrorMessage('Ошибка удаления'))
  }

  return (
    <HStack width={'100%'} gap={4}>
      <BaseAvatar name={displayName}/>
      <Text width={'100%'}>{displayName}</Text>
      {!isOwner && (
        <BaseModal
          title="Удаление пользователя"
          onClickSave={handleRemove}
          confirmLabel="Удалить"
          confirmColorPalette="red"
          buttonTrigger={
            <IconButton
              aria-label="Удалить пользователя"
              variant="ghost"
              size="xs"
              colorPalette="red"
            >
              <LuX />
            </IconButton>
          }
        >
          <Text>Вы действительно хотите удалить пользователя <strong>{displayName}</strong>?</Text>
        </BaseModal>
      )}
    </HStack>
  )
}

export default WorkspacePersonCard
