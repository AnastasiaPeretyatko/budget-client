import { useInviteUserMutation } from '@/entities/workspace/api/workspaceApi'
import { COLOR } from '@/shared/config/colors'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { Button, HStack, Input } from '@chakra-ui/react'
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
      <Input placeholder='Email address' borderColor={COLOR.BORDER} borderRadius={8} value={email} onChange={e => setEmail(e.target.value)}/>
      <Button size={'sm'} onClick={handleInvitePeople}>Invite people</Button>
    </HStack>
  )
}

export default InvitePeopleForm
