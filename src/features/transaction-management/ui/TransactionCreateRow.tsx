import { BaseTransactionType } from '@/entities/transaction'
import { Input, Table } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { SavingAccountSelect } from '@/features/saving-account-management'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/app/store'
import { fetchSavingAccountsThunk } from '@/entities/saving-account'
import moment from 'moment'

type Props = {
  transaction: BaseTransactionType | null;
  setTransaction: (transaction: BaseTransactionType) => void
}

const TransactionCreateRow = ({ transaction, setTransaction }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const [isEdit, setIsEdit] = useState(false)

  const handleDoubleClick = () => setIsEdit(!isEdit)

  useEffect(() => {
    if (!isEdit) return
    dispatch(fetchSavingAccountsThunk())
  }, [dispatch, isEdit])

  if (!transaction) {
    return null
  }

  return (
    <Table.Row height={'45px'}>
      <Table.Cell onDoubleClick={handleDoubleClick} p={0}>{isEdit ? <SavingAccountSelect onChange={(fromAccountId) => setTransaction({ ...transaction, fromAccountId })}/> : ''}</Table.Cell>
      <Table.Cell onDoubleClick={handleDoubleClick} p={0}>{isEdit ? <SavingAccountSelect onChange={(toAccountId) => setTransaction({ ...transaction, toAccountId })}/> : ''}</Table.Cell>
      <Table.Cell onDoubleClick={handleDoubleClick} p={0}>{isEdit ? <Input border={'none'} placeholder="Категория" onChange={(e) => setTransaction({ ...transaction, categoryId: e.target.value })}/> : ''}</Table.Cell>
      <Table.Cell onDoubleClick={handleDoubleClick} p={0}>{isEdit ? <Input border={'none'} onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}/> : ''}</Table.Cell>
      <Table.Cell onDoubleClick={handleDoubleClick} p={0}>{isEdit ? <Input border={'none'} type='date' defaultValue={moment(new Date()).format('YYYY-MM-DD')} onChange={(e) => setTransaction({ ...transaction, date: new Date(e.target.value) })}/> : ''}</Table.Cell>
      <Table.Cell onDoubleClick={handleDoubleClick} p={0}>{isEdit ? <Input border={'none'} onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}/> : ''}</Table.Cell>
    </Table.Row>
  )
}

export default TransactionCreateRow
