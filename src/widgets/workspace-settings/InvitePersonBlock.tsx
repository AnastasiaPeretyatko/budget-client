import InvitePeopleForm from '@/features/workspace-management/ui/InvitePeopleForm'
import { COLOR } from '@/shared/config/colors'
import { Heading, Text, VStack } from '@chakra-ui/react'
import WorkspacePeopleList from '../workspace-people/WorkspacePeopleList'

const InvitePersonBlock = () => {

  return (
    <VStack width={'100%'} align={'start'} gap={4}>
      <Heading size={'md'}>Invite members</Heading>
      <Text color={COLOR.LABEL}>
        Easily add new members to your team by entering their email addresses below. Once invited,
        they&apos;ll receive an email with a link to join.
      </Text>
      <InvitePeopleForm/>

      <WorkspacePeopleList/>
    </VStack>
  )
}

export default InvitePersonBlock
