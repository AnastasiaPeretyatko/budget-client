'use client'

import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'
import { fetchStatisticsByCategoryThunk } from '@/entities/statistics'
import { COLOR } from '@/shared/config/colors'
import { Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import CategoryBarChart, { type CategoryChartItem } from '@/shared/ui/CategoryBarChart'

const DashboardAnalytics = () => {
  const dispatch = useAppDispatch()
  const { items, uncategorized, totalSpent, isLoading } = useSelector(
    (state: RootState) => state.statistics
  )

  useEffect(() => {
    dispatch(fetchStatisticsByCategoryThunk({}))
  }, [dispatch])

  const chartData = useMemo<CategoryChartItem[]>(() => {
    const data: CategoryChartItem[] = items.map(item => ({
      name: item.categoryName,
      value: item.total,
      count: item.count,
      percent: item.percent,
    }))

    if (uncategorized && uncategorized.total > 0) {
      data.push({
        name: 'Без категории',
        value: uncategorized.total,
        count: uncategorized.count,
        percent: uncategorized.percent,
      })
    }

    return data
  }, [items, uncategorized])

  if (isLoading) {
    return (
      <VStack width="100%" py={10} align="center">
        <Spinner size="lg" />
      </VStack>
    )
  }

  if (chartData.length === 0) {
    return (
      <VStack width="100%" py={10} align="center">
        <Text color={COLOR.LABEL}>Нет данных о расходах</Text>
      </VStack>
    )
  }

  return (
    <VStack width="100%" align="start" gap={4}>
      <HStack width="100%" justify="space-between">
        <Heading size="md">Расходы по категориям</Heading>
        <Text fontWeight={600} fontSize="lg">
          {totalSpent.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽
        </Text>
      </HStack>

      <CategoryBarChart data={chartData} />
    </VStack>
  )
}

export default DashboardAnalytics
