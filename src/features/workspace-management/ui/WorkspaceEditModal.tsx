import { AppDispatch } from '@/app/store'
import { updateWorkspaceThunk } from '@/entities/workspace'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseModal from '@/shared/ui/modal'
import { Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

type Props = {
  workspaceId: string
  workspaceTitle: string
  trigger: React.ReactNode
}

const WorkspaceEditModal = ({ workspaceId, workspaceTitle, trigger }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const [title, setTitle] = useState(workspaceTitle)

  const handleSave = (close: () => void) => {
    dispatch(updateWorkspaceThunk({ id: workspaceId, data: { title } }))
      .unwrap()
      .then(() => {
        showSuccessMessage('Workspace updated successfully')
        close()
      })
      .catch(() => showErrorMessage('Error updating workspace'))
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
