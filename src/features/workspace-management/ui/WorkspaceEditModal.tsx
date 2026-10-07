import { useUpdateWorkspaceMutation } from '@/entities/workspace/api/workspaceApi'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseModal from '@/shared/ui/modal'
import { Input } from '@chakra-ui/react'
import { useState } from 'react'

type Props = {
  workspaceId: string
  workspaceTitle: string
  trigger: React.ReactNode
}

const WorkspaceEditModal = ({ workspaceId, workspaceTitle, trigger }: Props) => {
  const [updateWorkspace] = useUpdateWorkspaceMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const [title, setTitle] = useState(workspaceTitle)

  const handleSave = async (close: () => void) => {
    try {
      await updateWorkspace({ id: workspaceId, data: { title } }).unwrap()
      showSuccessMessage('Workspace updated successfully')
      close()
    } catch (error) {
      showErrorMessage('Error updating workspace', error)
    }
  }

  return (
    <BaseModal
      title='Редактировать workspace'
      buttonTrigger={trigger}
      onClickSave={handleSave}
      confirmLabel='Сохранить'
    >
      <Input
        placeholder='Название workspace'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
    </BaseModal>
  )
}

export default WorkspaceEditModal
