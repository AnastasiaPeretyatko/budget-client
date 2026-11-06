import { AuthUser } from '@/entities/auth'
import { useGetCurrentWorkspaceQuery, useRemoveWorkspaceUserMutation } from '../api/workspaceApi'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseAvatar from '@/shared/ui/avatar'
import BaseModal from '@/shared/ui/modal'
import { Badge, HStack, IconButton, Text } from '@chakra-ui/react'
import { LuX } from 'react-icons/lu'

type Props = {
  user: AuthUser
}

const WorkspacePersonCard = ({ user }: Props) => {
  const { data: currentWorkspace } = useGetCurrentWorkspaceQuery()
  const [removeWorkspaceUser] = useRemoveWorkspaceUserMutation()
  const { showSuccessMessage, showErrorMessage } = useNotifications()

  const isOwner = currentWorkspace?.ownerId === user.id

  const displayName = user.firstName || user.lastName
    ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
    : user.email

  const handleRemove = async (close: () => void) => {
    try {
      await removeWorkspaceUser(user.id).unwrap()
      showSuccessMessage('Пользователь удалён')
      close()
    } catch (error) {
      showErrorMessage('Ошибка удаления', error)
    }
  }

  return (
    <HStack width={'100%'} gap={4}>
      <BaseAvatar name={displayName} size='sm'/>
      <Text fontSize={'sm'} width={'100%'}>{displayName}</Text>
      <Badge>{isOwner ? 'owner' : 'member'}</Badge>
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
