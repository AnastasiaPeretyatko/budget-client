import { AppDispatch } from '@/common/store.config'
import ModalComponent from '@/components/ui/modal'
import { postWorkspaceThunk } from '@/entities/workspace/api/workspace.thunk'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { Button, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const WorkspaceCreateModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const [title, setTitle] = useState('')

  const onClickSave = () => {
    dispatch(postWorkspaceThunk({ title }))
      .unwrap()
      .then(() => showSuccessMessage('Workspace created successfully'))
      .catch(() => showErrorMessage('Error creating workspace'))
  }
  return (
    <ModalComponent title='Create new workspace' buttonTrigger={<Button variant={'ghost'}>+ Create workspace</Button>} onClickSave={onClickSave}>
      <Input placeholder='Workspace name' value={title} onChange={e => setTitle(e.target.value)}/>
    </ModalComponent>
  )
}

export default WorkspaceCreateModal
