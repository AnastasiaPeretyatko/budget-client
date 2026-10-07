import { BillingPeriodSummaryType, BillingPeriodType } from '@/entities/bulling-period'
import { PERIOD_DELTA_COLOR } from '@/entities/bulling-period/constants/period-result'
import { formatDelta } from '@/shared/utils/formatDelta'
import { formatDate } from '@/shared/utils/formatPeriod'
import { formattingMonay } from '@/shared/utils/formattingMonay'
import { Card, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import NextPeriodModal from './NextPeriodModal'
import PeriodParamsModal from './PeriodParamsModal'

// Насколько темп может опережать норму, чтобы ещё считаться «чуть выше нормы»
const PACE_WARNING_PERCENT = 10
const WARNING_COLOR = '#B45309'

type TileProps = {
  label: string
  value: string
  note?: string
  noteColor?: string
}

const StatTile = ({ label, value, note, noteColor = 'label' }: TileProps) => (
  <VStack
    align={'start'}
    gap={1}
    p={4}
    bg={'#F8FAFC'}
    borderRadius={12}
    borderWidth={'1px'}
    borderColor={'#E2E8F0'}
  >
    <Text fontSize={'11px'} color={'label'}>{label}</Text>
    <Heading size={'lg'}>{value}</Heading>
    {note && <Text fontSize={'11px'} fontWeight={600} color={noteColor}>{note}</Text>}
  </VStack>
)

const getPace = (deltaPercent?: number | null) => {
  if (deltaPercent === null || deltaPercent === undefined) return null

  const text = `${deltaPercent > 0 ? '+' : ''}${deltaPercent}% к норме`

  if (deltaPercent <= 0) return { note: `Темп идеален (${text})`, color: PERIOD_DELTA_COLOR.positive }
  if (deltaPercent <= PACE_WARNING_PERCENT) return { note: `Темп выше нормы (${text})`, color: WARNING_COLOR }
  return { note: `Перерасход по темпу (${text})`, color: PERIOD_DELTA_COLOR.negative }
}

type Props = {
  period?: BillingPeriodType
  summary?: BillingPeriodSummaryType
}

const CurrentCycleCard = ({ period, summary }: Props) => {
  if (!period) {
    return (
      <Card.Root width={'100%'} variant={'primary'} flexDir={'row'} alignItems={'center'} gap={4}>
        <VStack flex={1} align={'start'} gap={1}>
          <Heading size={'md'}>Нет открытого цикла</Heading>
          <Text fontSize={'12px'} color={'label'}>
            Создайте период, чтобы видеть план, расходы и прогноз по циклу.
          </Text>
        </VStack>
        <NextPeriodModal />
      </Card.Root>
    )
  }

  const daysTotal = summary?.period.daysTotal
  const daysLeft = summary?.period.daysLeft
  const pace = getPace(summary?.pace?.deltaPercent)
  const forecastBalance = summary?.forecast?.balance
  const isDeficit = Number(forecastBalance) < 0

  return (
    <Card.Root width={'100%'} variant={'primary'} gap={5}>
      <HStack width={'100%'} align={'start'} justify={'space-between'} gap={4}>
        <VStack align={'start'} gap={1}>
          <Text fontSize={'10px'} fontWeight={700} letterSpacing={'wider'} color={'primary'} textTransform={'uppercase'}>
            Текущий открытый цикл
          </Text>
          <Heading size={'lg'}>
            {formatDate(period.startDate)}{period.endDate && ` — ${formatDate(period.endDate)}`}
          </Heading>
          <Text fontSize={'12px'} color={'label'}>
            {daysTotal ? `Продолжительность: ${daysTotal} дн.` : 'Конец цикла не задан'}
            {period.startDay && ` • Синхронизирован с датой получения зарплаты (${period.startDay}-е число)`}
          </Text>
        </VStack>
        <HStack>
          <PeriodParamsModal period={period} />
          <NextPeriodModal period={period} />
        </HStack>
      </HStack>

      <Grid width={'100%'} templateColumns={'repeat(4, 1fr)'} gap={3}>
        <StatTile
          label='Дней пройдено'
          value={daysTotal ? `${summary?.period.daysPassed} из ${daysTotal} дней` : '—'}
          note={typeof daysLeft === 'number' ? `Осталось ${daysLeft} дн.` : undefined}
          noteColor={PERIOD_DELTA_COLOR.positive}
        />
        <StatTile
          label='План распределения'
          value={summary?.planned ? formattingMonay(summary.planned) : '—'}
          note={summary ? `Категорий с лимитом: ${summary.plannedCategories}` : undefined}
        />
        <StatTile
          label='Фактический расход'
          value={summary ? formattingMonay(summary.spent) : '—'}
          note={pace?.note}
          noteColor={pace?.color}
        />
        <StatTile
          label={`Прогнозируемый ${isDeficit ? 'дефицит' : 'профицит'}`}
          value={forecastBalance ? formatDelta(forecastBalance) : '—'}
          note={summary?.forecast?.spent ? `Прогноз расходов: ${formattingMonay(summary.forecast.spent)}` : undefined}
          noteColor={isDeficit ? PERIOD_DELTA_COLOR.negative : PERIOD_DELTA_COLOR.positive}
        />
      </Grid>
    </Card.Root>
  )
}

export default CurrentCycleCard
