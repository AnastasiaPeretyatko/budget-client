import { Heading } from '@chakra-ui/react'
import { FiArrowDown } from 'react-icons/fi'
import SummaryCard, { ChangeLabel, formatAmount } from '@/shared/ui/SummaryCard'

type Props = {
  value: number
  isLoading: boolean
  change?: { percent: number; sign: '+' | '-' }
}

const TotalIncomeCard = ({ value, isLoading, change }: Props) => (
  <SummaryCard
    label="Общий доход"
    tone="income"
    isLoading={isLoading}
    value={<Heading size="lg" color="income.fg">{formatAmount(value)} ₽</Heading>}
    change={change ? <ChangeLabel percent={change.percent} sign={change.sign} /> : undefined}
    icon={<FiArrowDown />}
  />
)

export default TotalIncomeCard
