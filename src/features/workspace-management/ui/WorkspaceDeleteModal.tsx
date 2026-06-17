import { AppDispatch } from '@/app/store'
import { deleteWorkspaceThunk } from '@/entities/workspace'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseModal from '@/shared/ui/modal'
import { Text } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

type Props = {
  workspaceId: string
  workspaceTitle: string
  trigger: React.ReactNode
}

const WorkspaceDeleteModal = ({ workspaceId, workspaceTitle, trigger }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const handleDelete = (close: () => void) => {
    dispatch(deleteWorkspaceThunk(workspaceId))
      .unwrap()
      .then(() => {
        showSuccessMessage('Workspace deleted successfully')
        close()
      })
      .catch(() => showErrorMessage('Error deleting workspace'))
  }

  return (
    <BaseModal
      title='Удаление workspace'
      buttonTrigger={trigger}
      onClickSave={handleDelete}
      confirmLabel='Удалить'
      confirmColorPalette='red'
    >
      <Text>
        Вы уверены, что хотите удалить workspace <strong>{workspaceTitle}</strong>? Это действие необратимо.
      </Text>
    </BaseModal>
  )
}

export default WorkspaceDeleteModal
