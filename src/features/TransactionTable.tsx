import { AppDispatch, RootState } from '@/common/store.config'
import { getAllTransactionThunk } from '@/entities/transaction/api/transaction.thunk'
import { Table } from '@chakra-ui/react'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TransactionTable = () => {
  const {transaction} = useSelector((state: RootState) => state.transactions)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getAllTransactionThunk())
  }, [dispatch])

  return (
    <Table.Root striped>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Откуда</Table.ColumnHeader>
          <Table.ColumnHeader>Куда</Table.ColumnHeader>
          <Table.ColumnHeader>Цена</Table.ColumnHeader>
          <Table.ColumnHeader>Дата</Table.ColumnHeader>
          <Table.ColumnHeader>Описание</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          transaction.map(tr => (
            <Table.Row key={tr.id}>
              <Table.Cell>{tr.fromAccount?.name ?? '-'}</Table.Cell>
              <Table.Cell>{tr.toAccount?.name ?? '-'}</Table.Cell>
              <Table.Cell>{tr.amount}</Table.Cell>
              <Table.Cell>{moment(tr.date).format('L')}</Table.Cell>
              <Table.Cell>{tr.description ?? '-'}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table.Root>
  )
}

export default TransactionTable