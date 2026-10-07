'use client'

import { PlanStatisticsType } from '@/entities/statistics'
import { COLOR } from '@/shared/config/colors'
import { formatDate } from '@/shared/utils/formatPeriod'
import { formattingMonay } from '@/shared/utils/formattingMonay'
import { toNumber } from '@/shared/utils/toNumber'
import { Box, Card, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import moment from 'moment'
import { useMemo } from 'react'
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const SPENT_COLOR = COLOR.PRIMARY_COLOR
const PLANNED_COLOR = '#94A3B8'
const CHART_HEIGHT = 300
// Пока точек немного, рисуем на линиях маркеры — иначе цикл выглядит пустым
const MAX_POINTS_WITH_DOTS = 14

type ChartPoint = {
  label: string
  fullLabel: string
  planned: number | null
  spent: number | null
}

const compactAmount = new Intl.NumberFormat('ru-RU', { notation: 'compact', maximumFractionDigits: 1 })

type TooltipProps = {
  active?: boolean
  payload?: Array<{ payload: ChartPoint }>
}

const ChartTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload?.length) return null
  const point = payload[0].payload

  return (
    <Box bg={'gray.900'} borderRadius={'md'} px={3} py={2}>
      <Text fontSize={'sm'} fontWeight={600} color={'white'}>{point.fullLabel}</Text>
      <Text fontSize={'xs'} color={PLANNED_COLOR}>
        План: {point.planned === null ? '—' : formattingMonay(point.planned)}
      </Text>
      <Text fontSize={'xs'} color={'#6EE7B7'}>
        Факт: {point.spent === null ? '—' : formattingMonay(point.spent)}
      </Text>
    </Box>
  )
}

const Legend = ({ color, label, dashed }: { color: string, label: string, dashed?: boolean }) => (
  <HStack gap={2}>
    <Box width={'18px'} height={0} borderTopWidth={'2px'} borderTopStyle={dashed ? 'dashed' : 'solid'} borderColor={color} />
    <Text fontSize={'11px'} color={'label'}>{label}</Text>
  </HStack>
)

type Props = {
  data: PlanStatisticsType
}

const PlanDynamicsChart = ({ data }: Props) => {
  const { granularity, points } = data.timeline
  const isDaily = granularity === 'day'

  const chartData = useMemo<ChartPoint[]>(() => points.map(point => ({
    label: moment(point.from).format('D MMM'),
    fullLabel: isDaily || point.from === point.to
      ? formatDate(point.from)
      : `${formatDate(point.from)} — ${formatDate(point.to)}`,
    planned: point.planned === null ? null : toNumber(point.planned),
    spent: point.spent === null ? null : toNumber(point.spent),
  })), [points, isDaily])

  const withDots = chartData.length <= MAX_POINTS_WITH_DOTS

  return (
    <Card.Root width={'100%'} variant={'primary'} gap={4}>
      <HStack width={'100%'} justify={'space-between'} align={'start'} wrap={'wrap'}>
        <VStack align={'start'} gap={0}>
          <Heading size={'md'}>Общая динамика плана и факта конвертов</Heading>
          <Text fontSize={'12px'} color={'label'}>
            {isDaily
              ? 'Накопительно по дням текущего цикла: плановый темп и фактические расходы'
              : 'Сравнение планового лимита и реального списания из физических и цифровых конвертов'
            }
          </Text>
        </VStack>
        <HStack gap={4}>
          <Legend color={PLANNED_COLOR} label='План' dashed />
          <Legend color={SPENT_COLOR} label='Факт' />
        </HStack>
      </HStack>

      {chartData.length === 0
        ? <Text color={'label'} py={10} textAlign={'center'}>Нет данных за выбранный период</Text>
        : (
          <Box width={'100%'} height={`${CHART_HEIGHT}px`}>
            <ResponsiveContainer width={'100%'} height={'100%'}>
              <ComposedChart data={chartData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id={'planSpentFill'} x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
                    <stop offset={'0%'} stopColor={SPENT_COLOR} stopOpacity={0.25} />
                    <stop offset={'100%'} stopColor={SPENT_COLOR} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={'#E2E8F0'} strokeDasharray={'3 3'} vertical={false} />
                <XAxis
                  dataKey={'label'}
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={24}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  tickLine={false}
                  axisLine={false}
                  width={56}
                  tickFormatter={(value: number) => compactAmount.format(value)}
                />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  dataKey={'planned'}
                  stroke={PLANNED_COLOR}
                  strokeWidth={2}
                  strokeDasharray={'6 4'}
                  dot={withDots ? { r: 3, fill: PLANNED_COLOR, stroke: 'none' } : false}
                  isAnimationActive={false}
                />
                <Area
                  dataKey={'spent'}
                  stroke={SPENT_COLOR}
                  strokeWidth={2}
                  fill={'url(#planSpentFill)'}
                  dot={withDots ? { r: 3, fill: SPENT_COLOR, stroke: 'none' } : false}
                  isAnimationActive={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        )
      }
    </Card.Root>
  )
}

export default PlanDynamicsChart
