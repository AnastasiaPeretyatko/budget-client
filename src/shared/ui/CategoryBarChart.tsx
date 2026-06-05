'use client'

import { COLOR } from '@/shared/config/colors'
import { Box, Text } from '@chakra-ui/react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, Cell,
} from 'recharts'

const CHART_COLORS = [
  '#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b',
  '#ef4444', '#ec4899', '#6366f1', '#14b8a6', '#f97316',
  '#84cc16', '#a855f7', '#0ea5e9', '#22c55e', '#eab308',
]

export type CategoryChartItem = {
  name: string
  value: number
  count: number
  percent: number
}

type Props = {
  data: CategoryChartItem[]
  height?: number
}

const CategoryBarChart = ({ data, height = 300 }: Props) => {
  const chartData = data.map((item, idx) => ({
    ...item,
    color: CHART_COLORS[idx % CHART_COLORS.length],
  }))

  return (
    <Box width="100%" height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 4, right: 12, bottom: 4, left: 4 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="name"
            fontSize={11}
            stroke={COLOR.LABEL}
            tickLine={false}
            interval={0}
            angle={-35}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tickFormatter={(v: number) => `${v.toLocaleString('ru-RU')} ₽`}
            fontSize={12}
            stroke={COLOR.LABEL}
            tickLine={false}
            width={90}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={28}>
            {chartData.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

type TooltipProps = {
  active?: boolean
  payload?: Array<{
    payload: {
      name: string
      value: number
      count: number
      percent: number
    }
  }>
}

const ChartTooltip = ({ active, payload }: TooltipProps) => {
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
        {data.value.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽ · {data.count} транзакций · {data.percent.toFixed(1)}%
      </Text>
    </Box>
  )
}

export default CategoryBarChart
