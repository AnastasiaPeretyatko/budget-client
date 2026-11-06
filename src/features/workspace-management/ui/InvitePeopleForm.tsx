import { useInviteUserMutation } from '@/entities/workspace/api/workspaceApi'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { Button, HStack, Input } from '@chakra-ui/react'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

const InvitePeopleForm = () => {
  const [inviteUser] = useInviteUserMutation()
  const { showSuccessMessage, showErrorMessage } = useNotifications()

  const [email, setEmail] = useState<string>('')

  const handleInvitePeople = async () => {
    if (!email) return;

    try {
      await inviteUser({ emails: [email] }).unwrap()
      showSuccessMessage('Invitation sent successfully')
      setEmail('')
    } catch (error) {
      showErrorMessage('Error sending invitation', error)
    }
  }

  return (
    <HStack width={'100%'} gap={4}>
      <Input variant={'primary'} placeholder='Почта...' value={email} onChange={e => setEmail(e.target.value)}/>
      <Button variant={'primary'} onClick={handleInvitePeople}><PlusIcon/> Пригласить</Button>
    </HStack>
  )
}

export default InvitePeopleForm
