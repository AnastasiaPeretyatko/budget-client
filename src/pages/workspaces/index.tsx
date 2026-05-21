import WorkspaceCreateModal from '@/features/WorkspaceCreateModal'
import WorkspaceListWidget from '@/widgets/workspace-list/WorkspaceListWidget'
import { VStack } from '@chakra-ui/react'

const WorkspacePage = () => {
  return (
    <VStack>
      <WorkspaceListWidget/>
      <WorkspaceCreateModal/>
    </VStack>
  )
}

export default WorkspacePage
