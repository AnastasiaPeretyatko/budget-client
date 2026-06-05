import { WorkspaceCreateModal } from '@/features/workspace-management'
import { WorkspaceListWidget } from '@/widgets/workspace-list'
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
