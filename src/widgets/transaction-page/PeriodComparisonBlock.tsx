'use client'

import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'
import { fetchPeriodComparisonThunk } from '@/entities/statistics'
import { fetchBillingPeriodsThunk } from '@/entities/bulling-period'
import { COLOR } from '@/shared/config/colors'
import { Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi'

type ComparisonItem = {
  name: string
  current: number
  previous: number
  diff: number
  diffPercent: number
}

const PeriodComparisonBlock = () => {
  const dispatch = useAppDispatch()
  const { periodComparison, isComparisonLoading } = useSelector(
    (state: RootState) => state.statistics
  )
  const { billingPeriods } = useSelector(
    (state: RootState) => state.billingPeriod
  )

  useEffect(() => {
    if (billingPeriods.length === 0) {
      dispatch(fetchBillingPeriodsThunk())
    }
  }, [billingPeriods.length, dispatch])

  useEffect(() => {
    if (billingPeriods.length > 1 && !periodComparison && !isComparisonLoading) {
      dispatch(fetchPeriodComparisonThunk())
    }
  }, [billingPeriods, periodComparison, isComparisonLoading, dispatch])

  const comparison = useMemo<ComparisonItem[]>(() => {
    if (!periodComparison) return []

    const { current, previous } = periodComparison
    if (previous.totalSpent === 0 && current.totalSpent === 0) return []

    const prevMap = new Map(
      previous.items.map(i => [i.categoryName, i.total])
    )

    const allNames = new Set([
      ...current.items.map(i => i.categoryName),
      ...previous.items.map(i => i.categoryName),
    ])

    const result: ComparisonItem[] = []
    allNames.forEach(name => {
      const cur = current.items.find(i => i.categoryName === name)?.total ?? 0
      const prev = prevMap.get(name) ?? 0
      if (cur === 0 && prev === 0) return

      const diff = cur - prev
      const diffPercent = prev > 0 ? (diff / prev) * 100 : cur > 0 ? 100 : 0

      result.push({ name, current: cur, previous: prev, diff, diffPercent })
    })

    result.sort((a, b) => Math.abs(b.diffPercent) - Math.abs(a.diffPercent))
    return result
  }, [periodComparison])

  const currentTotal = periodComparison?.current.totalSpent ?? 0
  const previousTotal = periodComparison?.previous.totalSpent ?? 0
  const totalDiff = currentTotal - previousTotal
  const totalDiffPercent = previousTotal > 0
    ? (totalDiff / previousTotal) * 100
    : 0

  if (isComparisonLoading) {
    return (
      <VStack width="100%" py={6} align="center">
        <Spinner size="md" />
      </VStack>
    )
  }

  if (!periodComparison || (previousTotal === 0 && currentTotal === 0)) {
    return (
      <VStack width="100%" py={6} align="center">
        <Text fontSize="sm" color={COLOR.LABEL}>
          Нет данных за предыдущий период для сравнения
        </Text>
      </VStack>
    )
  }

  return (
    <VStack width="100%" align="start" gap={3}>
      <HStack width="100%" justify="space-between">
        <Heading size="md">Сравнение с прошлым периодом</Heading>
        <DiffBadge diff={totalDiff} diffPercent={totalDiffPercent} size="lg" />
      </HStack>

      <HStack width="100%" justify="space-between" px={1}>
        <Text fontSize="sm" color={COLOR.LABEL}>Текущий период</Text>
        <Text fontSize="sm" fontWeight={500}>
          {currentTotal.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽
        </Text>
      </HStack>
      <HStack width="100%" justify="space-between" px={1} mt={-2}>
        <Text fontSize="sm" color={COLOR.LABEL}>Прошлый период</Text>
        <Text fontSize="sm" fontWeight={500} color={COLOR.LABEL}>
          {previousTotal.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽
        </Text>
      </HStack>

      <VStack width="100%" gap={1} mt={1}>
        {comparison.map(item => (
          <HStack
            key={item.name}
            width="100%"
            justify="space-between"
            gap={3}
            py={1.5}
            px={2}
            borderRadius="md"
            _hover={{ bg: 'rgba(255,255,255,0.03)' }}
          >
            <Text fontSize="sm" truncate minWidth={0} flex={1}>
              {item.name}
            </Text>
            <HStack gap={3} flexShrink={0}>
              <Text fontSize="sm" color={COLOR.LABEL} minWidth="80px" textAlign="right">
                {item.current.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽
              </Text>
              <DiffBadge diff={item.diff} diffPercent={item.diffPercent} size="sm" />
            </HStack>
          </HStack>
        ))}
      </VStack>
    </VStack>
  )
}

const DiffBadge = ({
  diff,
  diffPercent,
  size,
}: {
  diff: number
  diffPercent: number
  size: 'sm' | 'lg'
}) => {
  const isUp = diff > 0
  const isZero = diff === 0
  const color = isZero ? COLOR.LABEL : isUp ? '#ef4444' : COLOR.INCOME_TEXT
  const Icon = isUp ? FiTrendingUp : FiTrendingDown

  const fontSize = size === 'lg' ? 'sm' : 'xs'
  const iconSize = size === 'lg' ? 14 : 12

  if (isZero) {
    return (
      <Text fontSize={fontSize} color={color}>
        без изменений
      </Text>
    )
  }

  return (
    <HStack gap={1} flexShrink={0}>
      <Icon size={iconSize} color={color} />
      <Text fontSize={fontSize} fontWeight={500} color={color}>
        {isUp ? '+' : ''}{diffPercent.toFixed(0)}%
      </Text>
    </HStack>
  )
}

export default PeriodComparisonBlock
