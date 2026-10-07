import { PlanTagSlice } from '@/entities/statistics'
import CategoryPieChart, { PIE_COLORS, type PieChartItem } from '@/shared/ui/CategoryPieChart'
import { formattingMonay } from '@/shared/utils/formattingMonay'
import { toNumber } from '@/shared/utils/toNumber'
import { Box, Card, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'

const PIE_SIZE = 190
// У «Без тегов» и «Остальные теги» своего цвета нет — берём нейтральный
const NEUTRAL_COLOR = '#CBD5E1'

type Props = {
  tags: PlanTagSlice[]
}

const PlanTagsCard = ({ tags }: Props) => {
  const chartData = useMemo<PieChartItem[]>(() => tags.map((tag, index) => ({
    name: tag.name,
    value: toNumber(tag.total),
    count: tag.count,
    percent: tag.percent,
    fill: tag.color ?? (tag.tagId === null ? NEUTRAL_COLOR : PIE_COLORS[index % PIE_COLORS.length]),
  })), [tags])

  return (
    <Card.Root variant={'primary'} gap={4}>
      <VStack align={'start'} gap={0}>
        <Heading size={'md'}>Аналитика по тегам</Heading>
        <Text fontSize={'12px'} color={'label'}>Кросс-категорийные срезы расходов</Text>
      </VStack>

      {chartData.length === 0
        ? <Text color={'label'} py={6} textAlign={'center'}>Нет расходов за выбранный период</Text>
        : (
          <>
            <VStack width={'100%'} gap={6} align={'center'} wrap={'wrap'} justify={'center'}>
              <CategoryPieChart data={chartData} size={PIE_SIZE} />
              <VStack flex={1} width={'100%'} align={'start'} gap={2}>
                {chartData.map(item => (
                  <HStack key={item.name} width={'100%'} justify={'space-between'} gap={2}>
                    <HStack gap={2} minW={0}>
                      <Box width={'10px'} height={'10px'} borderRadius={'full'} bg={item.fill} flexShrink={0} />
                      <Text fontSize={'12px'} truncate>{item.name}</Text>
                    </HStack>
                    <Text fontSize={'12px'} fontWeight={600} flexShrink={0}>
                      {formattingMonay(item.value)}
                      <Text as={'span'} color={'label'} fontWeight={400}> · {Math.round(item.percent)}%</Text>
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>
            <Text fontSize={'11px'} color={'label'}>
              Транзакция с несколькими тегами учитывается в каждом из них
            </Text>
          </>
        )
      }
    </Card.Root>
  )
}

export default PlanTagsCard
