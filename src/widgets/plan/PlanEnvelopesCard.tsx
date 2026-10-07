import { CategoryCycleStatusEnum } from '@/entities/category'
import { CYCLE_STATUS_CONFIG } from '@/entities/category/constants/cycle-status'
import CategoryIcon from '@/entities/category/ui/CategoryIcon'
import { PlanCategoryItem } from '@/entities/statistics'
import { formattingMonay } from '@/shared/utils/formattingMonay'
import { Box, Card, Heading, HStack, Text, VStack } from '@chakra-ui/react'

const MAX_LIST_HEIGHT = '380px'

const STATUS_TEXT: Record<CategoryCycleStatusEnum, string> = {
  [CategoryCycleStatusEnum.OK]: 'В пределах лимита',
  [CategoryCycleStatusEnum.WARNING]: 'Близко к лимиту',
  [CategoryCycleStatusEnum.EXCEEDED]: 'Перерасход',
  [CategoryCycleStatusEnum.NO_LIMIT]: 'Без лимита',
}

const EnvelopeRow = ({ category }: { category: PlanCategoryItem }) => {
  const { color } = CYCLE_STATUS_CONFIG[category.status]
  const hasLimit = category.planned !== null
  // Полоса не выходит за 100%, перерасход виден по цвету и подписи
  const width = Math.min(category.percent ?? 0, 100)

  return (
    <HStack width={'100%'} gap={3} align={'center'}>
      <CategoryIcon icon={category.icon} color={category.color} />
      <VStack flex={1} minW={0} align={'start'} gap={1}>
        <HStack width={'100%'} justify={'space-between'} gap={2}>
          <Text fontSize={'13px'} fontWeight={700} truncate>{category.name}</Text>
          <Text fontSize={'12px'} fontWeight={600} flexShrink={0}>
            {formattingMonay(category.spent)}
            {category.planned !== null && (
              <Text as={'span'} color={'label'} fontWeight={400}>
                {' '}из {formattingMonay(category.planned)}
              </Text>
            )}
          </Text>
        </HStack>
        {hasLimit && (
          <Box width={'100%'} height={'6px'} borderRadius={'full'} bg={'#F1F5F9'} overflow={'hidden'}>
            <Box height={'100%'} width={`${width}%`} borderRadius={'full'} bg={color} />
          </Box>
        )}
        <Text fontSize={'11px'} color={hasLimit ? color : 'label'} fontWeight={600}>
          {STATUS_TEXT[category.status]}{category.percent !== null && ` · ${category.percent}%`}
        </Text>
      </VStack>
    </HStack>
  )
}

type Props = {
  categories: PlanCategoryItem[]
}

const PlanEnvelopesCard = ({ categories }: Props) => {
  return (
    <Card.Root variant={'primary'} gap={4} height={'100%'}>
      <VStack align={'start'} gap={0}>
        <Heading size={'md'}>Динамика по конвертам</Heading>
        <Text fontSize={'12px'} color={'label'}>Исполнение установленных лимитов за все время</Text>
      </VStack>

      {categories.length === 0
        ? <Text color={'label'} py={6} textAlign={'center'}>Нет лимитов и расходов за выбранный период</Text>
        : (
          <VStack
            width={'100%'}
            align={'start'}
            gap={4}
            maxHeight={MAX_LIST_HEIGHT}
            overflowY={'auto'}
            pr={1}
          >
            {categories.map(category => (
              <EnvelopeRow key={category.categoryId} category={category} />
            ))}
          </VStack>
        )
      }
    </Card.Root>
  )
}

export default PlanEnvelopesCard
