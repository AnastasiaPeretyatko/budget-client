import { AppDispatch, RootState } from '@/app/store'
import { fetchTransactionsThunk } from '@/entities/transaction'
import TransactionCard from '@/entities/transaction/ui/TransactionCard'
import { COLOR } from '@/shared/config/colors'
import { Text, VStack } from '@chakra-ui/react'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  accountId?: string
  limit?: number
  type?: string
}

const TransactionList = ({ accountId, limit, type }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const { transactions } = useSelector((state: RootState) => state.transactions)

  useEffect(() => {
    const filter: Record<string, unknown> = {}
    if (accountId) filter.accountId = accountId
    if (type) filter.type = type
    const paging = limit ? { limit } : undefined
    dispatch(fetchTransactionsThunk({ filter, paging }))
  }, [dispatch, accountId, limit, type])

  if (!transactions.length) {
    return <Text fontSize={'sm'} color={COLOR.LABEL}>You have no transactions for the current period</Text>
  }

  return (
    <VStack width={'100%'} align={'start'}>
      {transactions.map((tr, index) => {
        const currentDate = moment(tr.date).format('LL')

        const prevDate =
    index > 0
      ? moment(transactions[index - 1].date).format('LL')
      : null

        const shouldShowDate = currentDate !== prevDate

        return (
          <React.Fragment key={tr.id}>
            {shouldShowDate && <Text fontSize={'sm'} color={'gray.500'} _notFirst={{ mt: 4 }}>{currentDate}</Text>}

            <TransactionCard accountId={accountId} transaction={tr}/>
          </React.Fragment>
        )
      })}
    </VStack>
  )
}

export default TransactionList
