import { Heading } from '@chakra-ui/react'
import { COLOR } from '@/shared/config/colors'
import { RiWalletLine } from 'react-icons/ri'
import SummaryCard, { ChangeLabel, IconBadge, formatAmount } from '@/shared/ui/SummaryCard'

type Props = {
  balance: number
  isLoading: boolean
  change?: { percent: number; sign: '+' | '-' }
}

const BalanceCard = ({ balance, isLoading, change }: Props) => (
  <SummaryCard
    label="Текущий баланс"
    accentColor={COLOR.PRIMARY_COLOR}
    isLoading={isLoading}
    value={<Heading size="lg">{formatAmount(balance)} ₽</Heading>}
    change={change ? <ChangeLabel percent={change.percent} sign={change.sign} /> : undefined}
    badge={
      <IconBadge
        bg="rgba(174,144,254,0.18)"
        icon={<RiWalletLine color={COLOR.PRIMARY_COLOR} />}
      />
    }
  />
)

export default BalanceCard
