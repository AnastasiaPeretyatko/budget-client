import { Heading, Text } from '@chakra-ui/react'
import { COLOR } from '@/shared/config/colors'
import ProgressCircleUI from '@/shared/ui/progress-circle'
import SummaryCard from '@/shared/ui/SummaryCard'

const pluralDays = (n: number) => {
  const abs = Math.abs(n)
  if (abs % 10 === 1 && abs % 100 !== 11) return 'день'
  if (abs % 10 >= 2 && abs % 10 <= 4 && (abs % 100 < 10 || abs % 100 >= 20)) return 'дня'
  return 'дней'
}

type Props = {
  daysRemaining: number
  totalDays: number | null
  percent: number
}

const PeriodProgressCard = ({ daysRemaining, totalDays, percent }: Props) => (
  <SummaryCard
    label="До конца периода"
    accentColor={COLOR.PERIOD_TEXT}
    value={
      <Heading size="lg">
        {daysRemaining} {pluralDays(daysRemaining)}
      </Heading>
    }
    change={
      totalDays !== null ? (
        <Text fontSize="xs" color={COLOR.LABEL}>
          {totalDays - daysRemaining} из {totalDays} дней
        </Text>
      ) : undefined
    }
    badge={
      <ProgressCircleUI value={percent} size="md" colorPalette="blue" width="44px" height="44px" />
    }
  />
)

export default PeriodProgressCard
