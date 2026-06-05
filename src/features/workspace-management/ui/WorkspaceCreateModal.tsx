import { AppDispatch } from '@/app/store'
import BaseModal from '@/shared/ui/modal'
import { createWorkspaceThunk } from '@/entities/workspace'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { Button, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { COLOR } from '@/shared/config/colors'

const WorkspaceCreateModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const [title, setTitle] = useState('')

  const handleSave = () => {
    dispatch(createWorkspaceThunk({ title }))
      .unwrap()
      .then(() => showSuccessMessage('Workspace created successfully'))
      .catch(() => showErrorMessage('Error creating workspace'))
  }
  return (
    <BaseModal title='Create new workspace' buttonTrigger={<Button size={'sm'} bgColor={COLOR.PRIMARY_COLOR} fontWeight={50}>+ Создать пространство</Button>} onClickSave={handleSave}>
      <Input placeholder='Workspace name' value={title} onChange={e => setTitle(e.target.value)}/>
    </BaseModal>
  )
}

export default WorkspaceCreateModal
