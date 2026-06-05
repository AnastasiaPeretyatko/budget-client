'use client'

import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Heading, Spinner, Text, VStack } from '@chakra-ui/react'
import { ActivityCalendar, ThemeInput } from 'react-activity-calendar'
import { useColorMode } from '@/shared/ui/color-mode'
import { COLOR } from '@/shared/config/colors'
import { RootState, useAppDispatch } from '@/app/store'
import { fetchActivityThunk } from '@/entities/statistics'

const calendarTheme: ThemeInput = {
  light: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
}

const LABELS = {
  months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
  weekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  totalCount: '{{count}} транзакций за последний год',
  legend: { less: 'Меньше', more: 'Больше' },
}

const MAX_LEVEL = 4

function assignLevels(items: { date: string; count: number }[]) {
  const maxCount = Math.max(...items.map(i => i.count), 1)

  return items.map(item => ({
    ...item,
    level: item.count === 0
      ? 0
      : Math.min(Math.ceil((item.count / maxCount) * MAX_LEVEL), MAX_LEVEL) as 0 | 1 | 2 | 3 | 4,
  }))
}

const DashboardActivityCalendar = () => {
  const dispatch = useAppDispatch()
  const { activity, isActivityLoading } = useSelector((state: RootState) => state.statistics)
  const { colorMode } = useColorMode()

  useEffect(() => {
    dispatch(fetchActivityThunk())
  }, [dispatch])

  const data = useMemo(() => assignLevels(activity), [activity])

  if (isActivityLoading) {
    return (
      <VStack width="100%" py={10} align="center">
        <Spinner size="lg" />
      </VStack>
    )
  }

  if (data.length === 0) {
    return (
      <VStack width="100%" py={10} align="center">
        <Text color={COLOR.LABEL}>Нет данных об активности</Text>
      </VStack>
    )
  }

  return (
    <VStack width="100%" align="start" gap={4}>
      <Heading size="md">Активность</Heading>
      <ActivityCalendar
        data={data}
        theme={calendarTheme}
        colorScheme={colorMode}
        labels={LABELS}
        showWeekdayLabels
      />
    </VStack>
  )
}

export default DashboardActivityCalendar
