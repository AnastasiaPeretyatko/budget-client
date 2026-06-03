import { RootState } from '@/app/store'
import WorkspacePersonCard from '@/entities/workspace/ui/WorkspacePersonCard'
import { Heading, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const WorkspacePeopleList = () => {
  const { currentWorkspace } = useSelector((state: RootState) => state.workspaces)

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
