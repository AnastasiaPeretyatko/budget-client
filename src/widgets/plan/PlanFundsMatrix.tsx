import { MacroFundEnum } from '@/entities/category'
import { MACRO_FUND_CONFIG } from '@/entities/category/constants/macro-fund'
import { PlanFundItem } from '@/entities/statistics'
import { PERIOD_DELTA_COLOR } from '@/entities/bulling-period/constants/period-result'
import { formattingMonay } from '@/shared/utils/formattingMonay'
import { toNumber } from '@/shared/utils/toNumber'
import { Box, Card, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react'

// На сколько процентных пунктов доля может отличаться от нормы, чтобы считаться «в норме»
const TOLERANCE_PP = 5
const WARNING_COLOR = '#B45309'

const FUND_ORDER = [MacroFundEnum.ESSENTIALS, MacroFundEnum.LIFESTYLE, MacroFundEnum.SAVINGS]

// Полоса из трёх сегментов — для сравнения «факт» и «норма» одним взглядом
type StackedBarProps = { label: string, shares: Record<MacroFundEnum, number> }

const StackedBar = ({ label, shares }: StackedBarProps) => (
  <HStack width={'100%'} gap={3}>
    <Text fontSize={'11px'} color={'label'} width={'48px'} flexShrink={0}>{label}</Text>
    <HStack flex={1} gap={'2px'} height={'10px'}>
      {FUND_ORDER.map(fund => (
        <Box
          key={fund}
          height={'100%'}
          width={`${shares[fund]}%`}
          bg={MACRO_FUND_CONFIG[fund].color}
          borderRadius={'full'}
        />
      ))}
    </HStack>
  </HStack>
)

const getVerdict = (deltaPp: number) => {
  if (Math.abs(deltaPp) <= TOLERANCE_PP) {
    return { text: 'В пределах нормы', color: PERIOD_DELTA_COLOR.positive }
  }
  const rounded = Math.abs(Math.round(deltaPp))
  return deltaPp > 0
    ? { text: `Выше нормы на ${rounded} п.п.`, color: WARNING_COLOR }
    : { text: `Ниже нормы на ${rounded} п.п.`, color: WARNING_COLOR }
}

const FundCard = ({ item }: { item: PlanFundItem }) => {
  const { label, share, description, icon: Icon, bg, color } = MACRO_FUND_CONFIG[item.fund]
  const actual = item.actualShare
  const verdict = actual === null ? null : getVerdict(actual - share)

  return (
    <VStack align={'start'} gap={3} p={4} bg={'#F8FAFC'} borderRadius={12} borderWidth={'1px'} borderColor={'#E2E8F0'}>
      <HStack width={'100%'} justify={'space-between'} align={'start'}>
        <HStack gap={2}>
          <Box p={'8px'} bg={bg} color={color} borderRadius={'10px'}><Icon size={16} /></Box>
          <VStack align={'start'} gap={0}>
            <Text fontSize={'13px'} fontWeight={700}>{label}</Text>
            <Text fontSize={'11px'} color={'label'}>Норма {share}%</Text>
          </VStack>
        </HStack>
        <Heading size={'lg'}>{actual === null ? '—' : `${Math.round(actual)}%`}</Heading>
      </HStack>

      {/* Полоса факта и отметка нормы */}
      <Box position={'relative'} width={'100%'} height={'8px'} borderRadius={'full'} bg={'#E2E8F0'}>
        <Box height={'100%'} width={`${actual ?? 0}%`} borderRadius={'full'} bg={color} />
        <Box
          position={'absolute'}
          top={'-3px'}
          left={`${share}%`}
          width={'2px'}
          height={'14px'}
          bg={'#334155'}
          borderRadius={'full'}
        />
      </Box>

      <VStack align={'start'} gap={0}>
        <Text fontSize={'12px'} fontWeight={700}>{formattingMonay(item.spent)}</Text>
        <Text fontSize={'11px'} color={'label'}>
          В плане: {item.plannedShare === null ? '—' : `${Math.round(item.plannedShare)}%`} · {formattingMonay(item.planned)}
        </Text>
      </VStack>

      <Text fontSize={'11px'} fontWeight={600} color={verdict?.color ?? 'label'}>
        {verdict ? verdict.text : 'Расходов по фонду нет'}
      </Text>
      <Text fontSize={'11px'} color={'label'}>{description}</Text>
    </VStack>
  )
}

type Props = {
  funds: PlanFundItem[]
  unassignedSpent: string
}

const PlanFundsMatrix = ({ funds, unassignedSpent }: Props) => {
  const byFund = new Map(funds.map(item => [item.fund, item]))
  const hasData = funds.some(item => item.actualShare !== null)

  const actualShares = Object.fromEntries(
    FUND_ORDER.map(fund => [fund, byFund.get(fund)?.actualShare ?? 0])
  ) as Record<MacroFundEnum, number>
  const normShares = Object.fromEntries(
    FUND_ORDER.map(fund => [fund, MACRO_FUND_CONFIG[fund].share])
  ) as Record<MacroFundEnum, number>

  return (
    <Card.Root width={'100%'} variant={'primary'} gap={4}>
      <VStack align={'start'} gap={0}>
        <Heading size={'md'}>Матрица сбалансированности фондов (50 / 30 / 20)</Heading>
        <Text fontSize={'12px'} color={'label'}>
          Примерно сколько расходов ушло на каждый фонд по сравнению с нормой
        </Text>
      </VStack>

      {hasData && (
        <VStack width={'100%'} align={'start'} gap={2}>
          <StackedBar label='Факт' shares={actualShares} />
          <StackedBar label='Норма' shares={normShares} />
        </VStack>
      )}

      <Grid width={'100%'} templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={4}>
        {FUND_ORDER.map(fund => {
          const item = byFund.get(fund)
          return item && <FundCard key={fund} item={item} />
        })}
      </Grid>

      {!hasData && (
        <Text fontSize={'12px'} color={'label'}>
          Расходы пока не привязаны к фондам: укажите макро-фонд у категорий в настройках.
        </Text>
      )}
      {toNumber(unassignedSpent) > 0 && (
        <Text fontSize={'11px'} color={'label'}>
          Не учтено в матрице: {formattingMonay(unassignedSpent)} — расходы без категории
          или у категорий без макро-фонда.
        </Text>
      )}
    </Card.Root>
  )
}

export default PlanFundsMatrix
