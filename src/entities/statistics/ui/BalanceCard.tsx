import { Heading } from '@chakra-ui/react'
import { RiWalletLine } from 'react-icons/ri'
import SummaryCard, { ChangeLabel, formatAmount } from '@/shared/ui/SummaryCard'

type Props = {
  balance: number
  isLoading: boolean
  change?: { percent: number; sign: '+' | '-' }
}

const BalanceCard = ({ balance, isLoading, change }: Props) => (
  <SummaryCard
    label="Текущий баланс"
    tone="primary"
    isLoading={isLoading}
    value={<Heading size="lg">{formatAmount(balance)} ₽</Heading>}
    change={change ? <ChangeLabel percent={change.percent} sign={change.sign} /> : undefined}
    icon={<RiWalletLine />}
  />
)

export default BalanceCard
