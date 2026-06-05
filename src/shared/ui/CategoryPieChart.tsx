'use client'

import { COLOR } from '@/shared/config/colors'
import { Box, Text } from '@chakra-ui/react'
import { PieChart, Pie, Tooltip } from 'recharts'

export const PIE_COLORS = [
  '#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b',
  '#ef4444', '#ec4899', '#6366f1', '#14b8a6', '#f97316',
  '#84cc16', '#a855f7', '#0ea5e9', '#22c55e', '#eab308',
]

export type PieChartItem = {
  name: string
  value: number
  count: number
  percent: number
  fill: string
}

type Props = {
  data: PieChartItem[]
  size?: number
}

const CategoryPieChart = ({ data, size = 220 }: Props) => {
  return (
    <Box mx="auto">
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={size * 0.28}
          outerRadius={size * 0.42}
          paddingAngle={2}
          stroke="none"
          isAnimationActive={false}
        />
        <Tooltip content={<PieTooltip />} />
      </PieChart>
    </Box>
  )
}

type TooltipProps = {
  active?: boolean
  payload?: Array<{
    payload: PieChartItem
  }>
}

const PieTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload?.length) return null
  const data = payload[0].payload

  return (
    <Box
      bg="gray.900"
      border="1px solid"
      borderColor={COLOR.BORDER}
      borderRadius="md"
      px={3}
      py={2}
    >
      <Text fontSize="sm" fontWeight={600}>{data.name}</Text>
      <Text fontSize="xs" color={COLOR.LABEL}>
        {data.value.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽ · {data.count} транз. · {data.percent.toFixed(1)}%
      </Text>
    </Box>
  )
}

export default CategoryPieChart

