'use client'

import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'
import { fetchStatisticsByCategoryThunk } from '@/entities/statistics'
import { COLOR } from '@/shared/config/colors'
import { Spinner, Text, VStack } from '@chakra-ui/react'
import CategoryPieChart, { type PieChartItem, PIE_COLORS } from '@/shared/ui/CategoryPieChart'

const CategoryPieCard = () => {
  const dispatch = useAppDispatch()
  const { items, uncategorized, isLoading } = useSelector(
    (state: RootState) => state.statistics
  )

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

  useEffect(() => {
    dispatch(fetchStatisticsByCategoryThunk({}))
  }, [dispatch])

  return (
    <VStack align="start" gap={1}>

      {isLoading ? (
        <VStack width="100%" py={8} align="center">
          <Spinner size="md" />
        </VStack>
      ) : chartData.length === 0 ? (
        <VStack width="100%" py={8} align="center">
          <Text fontSize="sm" color={COLOR.LABEL}>Нет данных</Text>
        </VStack>
      ) : (
        <CategoryPieChart data={chartData} size={160} />
      )}
    </VStack>
  )
}

export default CategoryPieCard
