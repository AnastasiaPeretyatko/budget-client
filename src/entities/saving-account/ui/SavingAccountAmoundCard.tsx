import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'
import { fetchBalanceHistoryThunk } from '@/entities/statistics'
import { Card, chakra, Heading, HStack, Skeleton, Text, useSlotRecipe } from '@chakra-ui/react'
import { COLOR } from '@/shared/config/colors'
import { InfoTip } from '@/shared/ui/toggle-tip'
import { formatAmount } from '@/shared/ui/SummaryCard'
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from 'recharts'

type Props = {
  accountId: string
  savingAccountAmound: string
}

const CustomTooltip = (
  { active, payload }:
  { active?: boolean; payload?: { value: number }[] }
) => {
  if (!active || !payload?.length) return null
  return (
    <Text
      fontSize="xs"
      bg="gray.800"
      px={2}
      py={1}
      borderRadius="md"
      color="white"
      fontWeight={600}
    >
      {formatAmount(payload[0].value)} ₽
    </Text>
  )
}

const SavingAccountAmoundCard = ({ accountId, savingAccountAmound }: Props) => {
  const dispatch = useAppDispatch()
  const recipe = useSlotRecipe({ key: 'summaryCard' })
  const styles = recipe({ tone: 'primary' })
  const { balanceHistory, isBalanceHistoryLoading } = useSelector(
    (state: RootState) => state.statistics
  )

  useEffect(() => {
    if (accountId) dispatch(fetchBalanceHistoryThunk(accountId))
  }, [accountId, dispatch])

  const minBalance = balanceHistory.length
    ? Math.min(...balanceHistory.map((d) => d.balance))
    : 0

  return (
    <Card.Root css={{ ...styles.root, flex: 'initial' }} width="100%">
      <Card.Body display="flex" flexDir="column" gap={3} pb={!isBalanceHistoryLoading && balanceHistory.length > 1 ? 0 : 12} >
        <HStack gap={1}>
          <chakra.span css={styles.label}>Ожидаемый баланс</chakra.span>
          <InfoTip />
        </HStack>
        {isBalanceHistoryLoading ? (
          <Skeleton height="36px" width="60%" borderRadius="md" />
        ) : (
          <Heading size="lg">{formatAmount(Number(savingAccountAmound))} ₽</Heading>
        )}
      </Card.Body>

      {!isBalanceHistoryLoading && balanceHistory.length > 1 && (
        <ResponsiveContainer width="100%" height={64}>
          <AreaChart
            data={balanceHistory}
            margin={{ top: 8, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLOR.PRIMARY_COLOR} stopOpacity={0.35} />
                <stop offset="95%" stopColor={COLOR.PRIMARY_COLOR} stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis domain={[minBalance * 0.98, 'auto']} hide />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke={COLOR.PRIMARY_COLOR}
              strokeWidth={2}
              fill="url(#balanceGradient)"
              dot={false}
              activeDot={{ r: 4, fill: COLOR.PRIMARY_COLOR }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card.Root>
  )
}

export default SavingAccountAmoundCard
