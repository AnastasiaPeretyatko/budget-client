import { Heading } from '@chakra-ui/react'
import { FiArrowUp } from 'react-icons/fi'
import SummaryCard, { ChangeLabel, formatAmount } from '@/shared/ui/SummaryCard'

type Props = {
  value: number
  isLoading: boolean
  change?: { percent: number; sign: '+' | '-' }
}

const TotalSpentCard = ({ value, isLoading, change }: Props) => (
  <SummaryCard
    label="Общие расходы"
    tone="expense"
    isLoading={isLoading}
    value={<Heading size="lg">{formatAmount(value)} ₽</Heading>}
    change={change ? <ChangeLabel percent={change.percent} sign={change.sign} /> : undefined}
    icon={<FiArrowUp />}
  />
)

export default TotalSpentCard
