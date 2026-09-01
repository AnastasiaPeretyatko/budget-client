import { AppDispatch, RootState } from '@/app/store'
import { fetchTransactionsThunk } from '@/entities/transaction'
import { TagFilterOperator } from '@/entities/transaction/api/transaction.thunk'
import { TransactionTypeEnum } from '@/entities/transaction/types/transaction.type'
import { CheckboxDropdownValue } from '@/shared/ui/checkbox-dropdown'
import TransactionCard from '@/entities/transaction/ui/TransactionCard'
import { COLOR } from '@/shared/config/colors'
import { Text, VStack } from '@chakra-ui/react'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  accountId?: string
  limit?: number
  type?: TransactionTypeEnum
  tagFilter?: CheckboxDropdownValue
  dateBetween?: string[]
}

export function buildTagFilter(tagFilter: CheckboxDropdownValue): TagFilterOperator | undefined {
  const included = Object.entries(tagFilter).filter(([, s]) => s === 'included').map(([id]) => id)
  const excluded = Object.entries(tagFilter).filter(([, s]) => s === 'excluded').map(([id]) => id)

  if (included.length > 0) return included.length === 1 ? { eq: included[0] } : { in: included }
  if (excluded.length > 0) return { nin: excluded }
  return undefined
}

const TransactionList = ({ accountId, limit, type, tagFilter = {}, dateBetween }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const { transactions } = useSelector((state: RootState) => state.transactions)

  const tagFilterKey = JSON.stringify(tagFilter)
  const dateBetweenKey = JSON.stringify(dateBetween)

  useEffect(() => {
    const tag = buildTagFilter(tagFilter)
    dispatch(fetchTransactionsThunk({
      filter: {
        ...(accountId ? { accountId } : {}),
        ...(type ? { type } : {}),
        ...(tag ? { tag } : {}),
        ...(dateBetween && dateBetween.length === 2 ? { date: { between: dateBetween } } : {}),
      },
      paging: limit ? { limit } : undefined,
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, accountId, limit, type, tagFilterKey, dateBetweenKey])

  if (!transactions.length) {
    return <Text fontSize={'sm'} color={COLOR.LABEL}>You have no transactions for the current period</Text>
  }

  return (
    <VStack width={'100%'} align={'start'} gap={1}>
      {transactions.map((tr, index) => {
        const currentDate = moment(tr.date).format('LL')

        const prevDate =
    index > 0
      ? moment(transactions[index - 1].date).format('LL')
      : null

        const shouldShowDate = currentDate !== prevDate

        return (
          <React.Fragment key={tr.id}>
            {shouldShowDate && (
              <Text
                fontSize={'sm'}
                color={'gray.500'}
                pt={index === 0 ? 0 : 3}
                pb={1}
                width="100%"
              >
                {currentDate}
              </Text>
            )}
            <TransactionCard accountId={accountId} transaction={tr}/>
          </React.Fragment>
        )
      })}
    </VStack>
  )
}

export default TransactionList
