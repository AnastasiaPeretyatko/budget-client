import WorkspaceBanner from '@/entities/workspace/ui/WorkspaceBanner'
import { WorkspaceCreateModal } from '@/features/workspace-management'
import { COLOR } from '@/shared/config/colors'
import { WorkspaceListWidget } from '@/widgets/workspace-list'
import { Heading, Text, VStack } from '@chakra-ui/react'

const WorkspacePage = () => {
  return (
    <VStack width={'100%'} height={'100vh'} align={'start'} padding={'20px 30px'} justify={'space-between'} gap={6}>
      <VStack width={'100%'} align={'start'} gap={6}>
        <VStack width={'100%'} align={'start'} mb={4}>
          <Heading size={'2xl'} fontWeight={600}>Мои рабочие пространства</Heading>
          <Text color={COLOR.LABEL}>Организуйте свои финансы в разных пространствах</Text>
        </VStack>
        <WorkspaceCreateModal/>
      </VStack>
      <WorkspaceListWidget/>
      <WorkspaceBanner/>
    </VStack>
  )
}

export default WorkspacePage
