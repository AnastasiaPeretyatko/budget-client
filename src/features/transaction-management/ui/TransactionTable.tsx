import { AppDispatch, RootState } from '@/app/store'
import { fetchTransactionsThunk, createTransactionThunk } from '@/entities/transaction'
import { Button, Table } from '@chakra-ui/react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TransactionCreateRow from './TransactionCreateRow'
import { BaseTransactionType } from '@/entities/transaction'

const TransactionTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { transactions } = useSelector((state: RootState) => state.transactions)
  const { activeWorkspaceId } = useSelector((state: RootState) => state.workspaces)

  const [newTransaction, setNewTransaction] = useState<BaseTransactionType | null>(null)

  const handleAddTransaction = () => {
    if (!activeWorkspaceId) return

    if (newTransaction && newTransaction.amount !== '0') {
      dispatch(createTransactionThunk({ ...newTransaction, workspaceId: activeWorkspaceId }))
      setNewTransaction(null)
      return
    }

    setNewTransaction({
      amount: '0',
      description: null,
      date: new Date(),
      fromAccountId: undefined,
      toAccountId: undefined,
      workspaceId: activeWorkspaceId
    })
  }

  useEffect(() => {
    if (activeWorkspaceId) {
      dispatch(fetchTransactionsThunk({ filter: { workspaceId: activeWorkspaceId } }))
    }
  }, [dispatch, activeWorkspaceId])

  return (
    <>
      <Table.Root showColumnBorder size={'sm'}>
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
            transactions.map(transaction => (
              <Table.Row key={transaction.id}>
                <Table.Cell>{transaction.fromAccount?.name || '-'}</Table.Cell>
                <Table.Cell>{transaction.toAccount?.name || '-'}</Table.Cell>
                <Table.Cell>{transaction.amount}</Table.Cell>
                <Table.Cell>{moment(transaction.date).format('DD.MM.YYYY')}</Table.Cell>
                <Table.Cell>{transaction.description || '-'}</Table.Cell>
              </Table.Row>
            ))
          }
          <TransactionCreateRow transaction={newTransaction} setTransaction={setNewTransaction}/>
        </Table.Body>
      </Table.Root>
      <Button
        width={'100%'}
        justifyContent={'flex-start'}
        background={'none'}
        color={'white'}
        _hover={{
          background: 'gray.800'
        }}
        onClick={handleAddTransaction}
      >+ Добавить новую транзакцию</Button>
      <Button onClick={handleAddTransaction}>Сохранить</Button>
    </>

  )
}

export default TransactionTable
