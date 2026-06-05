import { AppDispatch } from '@/app/store'
import { inviteUserThunk } from '@/entities/workspace'
import { COLOR } from '@/shared/config/colors'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { Button, HStack, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const InvitePeopleForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { showSuccessMessage, showErrorMessage } = useNotifications()

  const [email, setEmail] = useState<string>('')

  const handleInvitePeople = () => {
    if (!email) return;

    dispatch(inviteUserThunk({ emails: [email] }))
      .unwrap()
      .then(() => {
        showSuccessMessage('Invitation sent successfully')
        setEmail('')
      })
      .catch(() => showErrorMessage('Error sending invitation'))
  }

  return (
    <HStack width={'100%'} gap={4}>
      <Input placeholder='Email address' borderColor={COLOR.BORDER} borderRadius={8} value={email} onChange={e => setEmail(e.target.value)}/>
      <Button size={'sm'} onClick={handleInvitePeople}>Invite people</Button>
    </HStack>
  )
}

export default InvitePeopleForm
