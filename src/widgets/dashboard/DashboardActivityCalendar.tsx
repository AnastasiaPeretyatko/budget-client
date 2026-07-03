'use client'

import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Card, HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import { ActivityCalendar, ThemeInput } from 'react-activity-calendar'
import { useColorMode } from '@/shared/ui/color-mode'
import { COLOR } from '@/shared/config/colors'
import { InfoTip } from '@/shared/ui/toggle-tip'
import { RootState, useAppDispatch } from '@/app/store'
import { fetchActivityThunk } from '@/entities/statistics'

const calendarTheme: ThemeInput = {
  light: ['#e8e0ff', '#c4a8fc', '#a07ef8', '#7c54f4', '#AE90FE'],
  dark: ['#1e1b2e', '#2d1f5e', '#4a2fa0', '#7254d4', COLOR.PRIMARY_COLOR],
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

  return (
    <Card.Root width="100%" style={{ background: `linear-gradient(135deg, ${COLOR.PRIMARY_COLOR}18 0%, transparent 60%)` }}>
      <Card.Body p={5}>
        <VStack width="100%" align="start" gap={5}>
          <HStack gap={1}>
            <Text fontWeight={600} fontSize="md">Активность расходов</Text>
            <InfoTip />
          </HStack>

          {isActivityLoading ? (
            <VStack width="100%" py={6} align="center">
              <Spinner size="lg" />
            </VStack>
          ) : data.length === 0 ? (
            <VStack width="100%" py={6} align="center">
              <Text color={COLOR.LABEL}>Нет данных об активности</Text>
            </VStack>
          ) : (
            <ActivityCalendar
              data={data}
              theme={calendarTheme}
              colorScheme={colorMode}
              labels={LABELS}
              showWeekdayLabels={['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']}
              weekStart={1}
              blockSize={13}
              blockMargin={4}
              blockRadius={3}
              fontSize={11}
              style={{ width: '100%' }}
            />
          )}
        </VStack>
      </Card.Body>
    </Card.Root>
  )
}

export default DashboardActivityCalendar
