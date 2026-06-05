'use client'

import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'
import { fetchStatisticsByCategoryThunk } from '@/entities/statistics'
import { COLOR } from '@/shared/config/colors'
import { Box, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import CategoryPieChart, { type PieChartItem, PIE_COLORS } from '@/shared/ui/CategoryPieChart'

const CategoryPieCard = () => {
  const dispatch = useAppDispatch()
  const { items, uncategorized, totalSpent, isLoading } = useSelector(
    (state: RootState) => state.statistics
  )

  useEffect(() => {
    dispatch(fetchStatisticsByCategoryThunk({}))
  }, [dispatch])

  const chartData = useMemo<PieChartItem[]>(() => {
    const data: PieChartItem[] = items.map((item, idx) => ({
      name: item.categoryName,
      value: Number(item.total),
      count: item.count,
      percent: item.percent,
      fill: PIE_COLORS[idx % PIE_COLORS.length],
    }))

    if (uncategorized && uncategorized.total > 0) {
      data.push({
        name: 'Без категории',
        value: Number(uncategorized.total),
        count: uncategorized.count,
        percent: uncategorized.percent,
        fill: PIE_COLORS[data.length % PIE_COLORS.length],
      })
    }

    return data
  }, [items, uncategorized])

  return (
    <Box
      border="1px solid"
      borderColor={COLOR.BORDER}
      borderRadius="lg"
      p={5}
      width="360px"
    >
      <VStack align="start" gap={1}>
        <VStack width="100%" align={'start'}>
          <Heading fontSize="sm" fontWeight={600} color={COLOR.LABEL}>По категориям</Heading>
          {!isLoading && chartData.length > 0 && (
            <Text fontSize="lg" fontWeight={600}>
              {totalSpent.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽
            </Text>
          )}
        </VStack>

        {isLoading ? (
          <VStack width="100%" py={8} align="center">
            <Spinner size="md" />
          </VStack>
        ) : chartData.length === 0 ? (
          <VStack width="100%" py={8} align="center">
            <Text fontSize="sm" color={COLOR.LABEL}>Нет данных</Text>
          </VStack>
        ) : (
          <HStack width="100%" gap={4} align="center">
            <VStack gap={1} align="start" flex={1} minW={0}>
              {chartData.map((item, idx) => (
                <HStack key={idx} width="100%" justify="space-between" fontSize="xs">
                  <HStack gap={2} minW={0}>
                    <Box
                      width="8px"
                      height="8px"
                      borderRadius="full"
                      flexShrink={0}
                      bg={item.fill}
                    />
                    <Text truncate>{item.name}</Text>
                  </HStack>
                  <Text color={COLOR.LABEL} flexShrink={0}>{item.percent.toFixed(1)}%</Text>
                </HStack>
              ))}
            </VStack>
            <CategoryPieChart data={chartData} size={160} />
          </HStack>
        )}
      </VStack>
    </Box>
  )
}

export default CategoryPieCard
