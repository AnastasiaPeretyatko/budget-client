import WorkspaceCreateModal from '@/features/WorkspaceCreateModal'
import WorkspaceListWidget from '@/widgets/workspace-list/WorkspaceListWidget'
import { Container, VStack } from '@chakra-ui/react'

const WorkspacePage = () => {
  return (
    <Container display={'flex'} justifyContent={'center'} padding={4} flexDir={'column'}>
      {/* <Sidebar/> */}
      <VStack>
        <WorkspaceListWidget/>
        <WorkspaceCreateModal/>
      </VStack>
    </Container>
  )
}

export default WorkspacePage
