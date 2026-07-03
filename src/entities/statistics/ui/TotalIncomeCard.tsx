import { Heading } from '@chakra-ui/react'
import { COLOR } from '@/shared/config/colors'
import { FiArrowDown } from 'react-icons/fi'
import SummaryCard, { ChangeLabel, IconBadge, formatAmount } from '@/shared/ui/SummaryCard'

type Props = {
  value: number
  isLoading: boolean
  change?: { percent: number; sign: '+' | '-' }
}

const TotalIncomeCard = ({ value, isLoading, change }: Props) => (
  <SummaryCard
    label="Общий доход"
    accentColor={COLOR.INCOME_TEXT}
    isLoading={isLoading}
    value={<Heading size="lg" color={COLOR.INCOME_TEXT}>{formatAmount(value)} ₽</Heading>}
    change={change ? <ChangeLabel percent={change.percent} sign={change.sign} /> : undefined}
    badge={
      <IconBadge
        bg="rgba(97,209,97,0.15)"
        icon={<FiArrowDown color={COLOR.INCOME_TEXT} />}
      />
    }
  />
)

export default TotalIncomeCard
