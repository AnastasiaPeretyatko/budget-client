import { PlanStatisticsType } from '@/entities/statistics'
import { PERIOD_DELTA_COLOR } from '@/entities/bulling-period/constants/period-result'
import { formattingMonay } from '@/shared/utils/formattingMonay'
import { toNumber } from '@/shared/utils/toNumber'
import { Card, Flex, Grid, Heading, Link, Text, VStack } from '@chakra-ui/react'
import { Gauge, PiggyBank, Receipt, Wallet } from 'lucide-react'
import NextLink from 'next/link'
import React from 'react'

const WARNING_COLOR = '#B45309'
// Ниже этой доли конвертов без перерасхода темп считаем плохим
const BAD_DISCIPLINE_PERCENT = 50

type StatCardProps = {
  icon: React.ReactNode
  iconBg: string
  label: string
  value: string
  note?: React.ReactNode
  noteColor?: string
}

const StatCard = ({ icon, iconBg, label, value, note, noteColor = 'label' }: StatCardProps) => (
  <Card.Root variant={'primary'} flexDirection={'row'} gap={3} alignItems={'start'} padding={'16px'}>
    <Flex align={'center'} justify={'center'} borderRadius={'12px'} bg={iconBg} padding={'10px'} flexShrink={0}>
      {icon}
    </Flex>
    <VStack align={'start'} gap={1} minW={0}>
      <Text fontSize={'11px'} fontWeight={700} color={'label'} textTransform={'uppercase'}>{label}</Text>
      <Heading size={'xl'}>{value}</Heading>
      {note && <Text fontSize={'11px'} fontWeight={600} color={noteColor}>{note}</Text>}
    </VStack>
  </Card.Root>
)

type Props = {
  data: PlanStatisticsType
}

const PlanSummaryCards = ({ data }: Props) => {
  const planned = toNumber(data.totals.planned)
  const spent = toNumber(data.totals.spent)
  const limitedCount = data.categories.filter(category => category.planned !== null).length

  // Копейки округляем, чтобы не показывать хвосты вроде 0.1 + 0.2
  const rest = Math.round((planned - spent) * 100) / 100
  const spentPercent = planned > 0 ? Math.round((spent / planned) * 100) : null

  const { respected, total } = data.discipline
  const disciplinePercent = total > 0 ? Math.round((respected / total) * 100) : null
  const disciplineColor = disciplinePercent === null
    ? 'label'
    : disciplinePercent === 100
      ? PERIOD_DELTA_COLOR.positive
      : disciplinePercent < BAD_DISCIPLINE_PERCENT
        ? PERIOD_DELTA_COLOR.negative
        : WARNING_COLOR

  const spentNote = planned > 0
    ? `${spentPercent}% от плана · ${rest >= 0 ? 'остаток' : 'перерасход'} ${formattingMonay(Math.abs(rest))}`
    : 'У конвертов нет лимитов'

  return (
    <Grid width={'100%'} templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }} gap={4}>
      <StatCard
        icon={<Wallet size={20} color='#2563EB'/>}
        iconBg={'#EFF6FF'}
        label='Всего распределено'
        value={formattingMonay(planned)}
        note={`Конвертов с лимитом: ${limitedCount}`}
      />
      <StatCard
        icon={<Receipt size={20} color='#EA580C'/>}
        iconBg={'#FFF7ED'}
        label='Фактический расход'
        value={formattingMonay(spent)}
        note={spentNote}
        noteColor={planned > 0 && rest < 0 ? PERIOD_DELTA_COLOR.negative : 'label'}
      />
      <StatCard
        icon={<PiggyBank size={20} color='#059669'/>}
        iconBg={'#ECFDF5'}
        label='В резервный сейф'
        value={formattingMonay(data.totals.toSafe)}
        note={data.safeAccountsCount > 0
          ? `Сейфов: ${data.safeAccountsCount}`
          : (
            <>
              Сейф не выбран.{' '}
              <Link as={NextLink} href={'/budgets'} color={'primary'}>
                Отметьте накопительный в его настройках
              </Link>
            </>
          )
        }
      />
      <StatCard
        icon={<Gauge size={20} color='#7C3AED'/>}
        iconBg={'#F5F3FF'}
        label='Темп дисциплины'
        value={total > 0 ? `${respected} из ${total}` : '—'}
        note={total > 0
          ? `Конвертов без перерасхода: ${disciplinePercent}%`
          : 'Нет конвертов с лимитом'
        }
        noteColor={disciplineColor}
      />
    </Grid>
  )
}

export default PlanSummaryCards
