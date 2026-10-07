import BaseModal from '@/shared/ui/modal'
import { useCreateWorkspaceMutation } from '@/entities/workspace/api/workspaceApi'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { Button, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { COLOR } from '@/shared/config/colors'

const WorkspaceCreateModal = () => {
  const [createWorkspace] = useCreateWorkspaceMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const [title, setTitle] = useState('')

  const handleSave = async (close: () => void) => {
    try {
      await createWorkspace({ title }).unwrap()
      showSuccessMessage('Workspace created successfully')
      close()
    } catch {
      showErrorMessage('Error creating workspace')
    }
  }
  return (
    <BaseModal title='Create new workspace' buttonTrigger={<Button size={'sm'} bgColor={COLOR.PRIMARY_COLOR} fontWeight={50}>+ Создать пространство</Button>} onClickSave={handleSave}>
      <Input placeholder='Workspace name' value={title} onChange={e => setTitle(e.target.value)}/>
    </BaseModal>
  )
}

export default WorkspaceCreateModal
