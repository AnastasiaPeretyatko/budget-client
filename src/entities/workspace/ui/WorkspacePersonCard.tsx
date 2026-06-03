import { AuthUser } from '@/entities/auth'
import BaseAvatar from '@/shared/ui/avatar'
import { HStack, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
  user: AuthUser
}

const WorkspacePersonCard = ({ user }: Props) => {
  return (
    <HStack width={'100%'} gap={4}>
      <BaseAvatar name={user.email}/>
      <Text width={'100%'}>{user.email}</Text>
    </HStack>
  )
}

export default WorkspacePersonCard
