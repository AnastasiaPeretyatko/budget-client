import { AppDispatch, RootState } from '@/app/store'
import { fetchTransactionsThunk } from '@/entities/transaction'
import TransactionCard from '@/entities/transaction/ui/TransactionCard'
import { Text, VStack } from '@chakra-ui/react'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  accountId: string
}

const TransactionList = ({ accountId }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const { transactions } = useSelector((state: RootState) => state.transactions)

  useEffect(() => {
    if (accountId) {
      // const filter = accountId ? { accountId }: {}
      dispatch(fetchTransactionsThunk({ filter: {} }))
    }
  }, [dispatch, accountId])

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
