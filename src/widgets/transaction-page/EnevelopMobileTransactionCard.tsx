/* eslint-disable react-hooks/set-state-in-effect */

import React, { useEffect, useState } from 'react'
import TransactionCard from './TransactionCard'
import { useGetTransactionQuery } from '@/entities/transaction/api/transactionApi'
import InfiniteScroll from 'react-infinite-scroll-component'
import { TransactionType } from '@/entities/transaction'
import { Box, Spinner, Center } from '@chakra-ui/react'

type Props = {
  accountId: string | undefined
}

const LIMIT = 5

const EnevelopMobileTransactionCard = ({ accountId }: Props) => {
  const [items, setItems] = useState<TransactionType[]>([])
  const [page, setPage] = useState(0)

  const { currentData: transaction, isFetching } = useGetTransactionQuery(
    {
      filter: { accountId },
      paging: {
        limit: LIMIT,
        offset: page * LIMIT,
      },
    },
    { skip: !accountId }
  )

  // Сбрасываем список при смене счёта
  useEffect(() => {
    setItems([])
    setPage(0)
  }, [accountId])

  // Добавляем новые транзакции
  useEffect(() => {
    if (!transaction?.rows) return

    setItems(prev => {
      if (page === 0) return transaction.rows

      const existingIds = new Set(prev.map(t => t.id))

      return [
        ...prev,
        ...transaction.rows.filter(t => !existingIds.has(t.id)),
      ]
    })
  }, [transaction, page])

  const hasMore = items.length < (transaction?.count ?? 0)

  const loadMore = () => {
    if (!isFetching && hasMore) {
      setPage(prev => prev + 1)
    }
  }

  return (
    <Box
      id="scrollableDiv"
      width="100%"
      height="400px"
      overflowY="auto"
    >
      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={hasMore}
        scrollableTarget="scrollableDiv"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          background: 'white',
          borderRadius: 16,
          padding: 14
        }}
        loader={
          <Center py={4}>
            <Spinner size="sm" />
          </Center>
        }
        // endMessage={
        //   items.length > 0 && (
        //     <Center py={4}>
        //       <Text color="fg.muted" fontSize="sm">
        //         Все транзакции загружены
        //       </Text>
        //     </Center>
        //   )
        // }
      >
        {items.map(t => (
          <TransactionCard
            key={t.id}
            transaction={t}
          />
        ))}
      </InfiniteScroll>
    </Box>
  )
}

export default EnevelopMobileTransactionCard
