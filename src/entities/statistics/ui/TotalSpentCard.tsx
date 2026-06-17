import { Heading } from '@chakra-ui/react'
import { COLOR } from '@/shared/config/colors'
import { FiArrowUp } from 'react-icons/fi'
import SummaryCard, { ChangeLabel, IconBadge, formatAmount } from '@/shared/ui/SummaryCard'

type Props = {
  value: number
  isLoading: boolean
  change?: { percent: number; sign: '+' | '-' }
}

const TotalSpentCard = ({ value, isLoading, change }: Props) => (
  <SummaryCard
    label="Общие расходы"
    accentColor={COLOR.EXPENSE_TEXT}
    isLoading={isLoading}
    value={<Heading size="lg">{formatAmount(value)} ₽</Heading>}
    change={change ? <ChangeLabel percent={change.percent} sign={change.sign} /> : undefined}
    badge={
      <IconBadge
        bg="rgba(249,115,22,0.15)"
        icon={<FiArrowUp color={COLOR.EXPENSE_TEXT} />}
      />
    }
  />
)

export default TotalSpentCard
