import { AppDispatch, RootState } from '@/common/store.config'
import { getAllTransactionThunk, postTransactionThunk } from '@/entities/transaction/api/transaction.thunk'
import { Button, Table } from '@chakra-ui/react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TransactionCreateRow from './TransactionCreateRow'
import { BaseTransactionType } from '@/entities/transaction/types/transaction.type'
import { useRouter } from 'next/router'

const TransactionTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { transaction } = useSelector((state: RootState) => state.transactions)

  const [newTransitions, setNewTransitions] = useState<BaseTransactionType | null>(null)

  const createNewTransitions = () => {
    if (newTransitions && newTransitions.amount !== '0') {
      const workspaceId = router.query.id as string
      dispatch(postTransactionThunk({ ...newTransitions, workspaceId }))
      setNewTransitions(null)
      return
    }

    setNewTransitions({
      amount: '0',
      description: null,
      date: new Date(),
      fromAccountId: undefined,
      toAccountId: undefined,
      workspaceId: router.query.id as string
    })
  }

  useEffect(() => {
    if (router.query.id) {
      const filter = { workspaceId: router.query.id as string }
      dispatch(getAllTransactionThunk({ filter }))
    }
  }, [dispatch, router.query.id])

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
            transaction.map(tr => (
              <Table.Row key={tr.id}>
                <Table.Cell>{tr.fromAccount?.name || '-'}</Table.Cell>
                <Table.Cell>{tr.toAccount?.name || '-'}</Table.Cell>
                <Table.Cell>{tr.amount}</Table.Cell>
                <Table.Cell>{moment(tr.date).format('DD.MM.YYYY')}</Table.Cell>
                <Table.Cell>{tr.description || '-'}</Table.Cell>
              </Table.Row>
            ))
          }
          <TransactionCreateRow transaction={newTransitions} setTransaction={setNewTransitions}/>
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
        onClick={createNewTransitions}
      >+ Добавить новую транзакцию</Button>
      <Button onClick={createNewTransitions}>Сохранить</Button>
    </>

  )
}

export default TransactionTable
