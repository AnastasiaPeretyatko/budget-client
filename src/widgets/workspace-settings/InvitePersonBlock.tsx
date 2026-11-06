import InvitePeopleForm from '@/features/workspace-management/ui/InvitePeopleForm'
import { Heading, Text, VStack } from '@chakra-ui/react'
import WorkspacePeopleList from '../workspace-people/WorkspacePeopleList'

const InvitePersonBlock = () => {

  return (
    <VStack width={'100%'} align={'start'} gap={4}>
      <VStack align={'start'} gap={0}>
        <Heading fontSize={'18px'}>Пригласить участников</Heading>
        <Text fontSize={'sm'} color={'label'}>
        Вы можете легко добавить новых участников в свою команду,
        введя их адреса электронной почты ниже.
        После приглашения они получат электронное письмо со ссылкой для вступления в команду.
        </Text>
      </VStack>
      <InvitePeopleForm/>

      <WorkspacePeopleList/>
    </VStack>
  )
}

export default InvitePersonBlock
