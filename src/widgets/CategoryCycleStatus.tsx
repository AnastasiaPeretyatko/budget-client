import { CategoryCycleType } from '@/entities/category'
import { CYCLE_STATUS_CONFIG } from '@/entities/category/constants/cycle-status'
import { formattingMonay } from '@/shared/utils/formattingMonay'
import { HStack, ProgressRange, ProgressRoot, ProgressTrack, Text, VStack } from '@chakra-ui/react'

type Props = {
  cycle?: CategoryCycleType | null
}

const CategoryCycleStatus = ({ cycle }: Props) => {
  if (!cycle) return <Text color={'label'}>—</Text>

  const { color } = CYCLE_STATUS_CONFIG[cycle.status]

  return (
    <VStack align={'start'} gap={1}>
      <HStack width={'100%'} justify={'space-between'}>
        <Text fontSize={'12px'}>{formattingMonay(cycle.spent)} израсх.</Text>
        {cycle.percent !== null && (
          <Text fontSize={'12px'} fontWeight={700} color={color}>{cycle.percent}%</Text>
        )}
      </HStack>
      {cycle.percent !== null && (
        <ProgressRoot width={'100%'} value={Math.min(cycle.percent, 100)} variant={'primary'}>
          <ProgressTrack>
            <ProgressRange bg={color} />
          </ProgressTrack>
        </ProgressRoot>
      )}
    </VStack>
  )
}

export default CategoryCycleStatus
