import { useGetCurrentWorkspaceQuery } from '@/entities/workspace/api/workspaceApi'
import WorkspacePersonCard from '@/entities/workspace/ui/WorkspacePersonCard'
import { Heading, VStack } from '@chakra-ui/react'

const WorkspacePeopleList = () => {
  const { data: currentWorkspace } = useGetCurrentWorkspaceQuery()

  return (
    <VStack width={'100%'} gap={4} align={'start'}>
      <Heading size='sm'>Members with access</Heading>
      {
        currentWorkspace?.users.map(user => (
          <WorkspacePersonCard key={user.id} user={user}/>
        ))
      }
    </VStack>
  )
}

export default WorkspacePeopleList
