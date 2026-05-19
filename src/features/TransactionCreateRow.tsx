import { BaseTransactionType } from '@/entities/transaction/types/transaction.type'
import { Input, Table } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import SelectListSavingAccount from './SelectListSavingAccount'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/common/store.config'
import { getAllSavingThunk } from '@/entities/saving-account/api/saving-account.thunk'
import moment from 'moment'

type Props = {
  transaction: BaseTransactionType | null;
  setTransaction: (transaction: BaseTransactionType) => void
}

const TransactionCreateRow = ({ transaction, setTransaction }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const [isEdit, setIsEdit] = useState(false)

  const onDoubleClick = () => setIsEdit(!isEdit)

  useEffect(() => {
    if (!isEdit) return
    dispatch(getAllSavingThunk())
  }, [dispatch, isEdit])

  if (!transaction) {
    return null
  }

  return (
    <Table.Row height={'45px'}>
      <Table.Cell onDoubleClick={onDoubleClick} p={0}>{isEdit ? <SelectListSavingAccount onChange={(fromAccountId) => setTransaction({ ...transaction, fromAccountId })}/> : ''}</Table.Cell>
      <Table.Cell onDoubleClick={onDoubleClick} p={0}>{isEdit ? <SelectListSavingAccount onChange={(toAccountId) => setTransaction({ ...transaction, toAccountId })}/> : ''}</Table.Cell>
      <Table.Cell onDoubleClick={onDoubleClick} p={0}>{isEdit ? <Input border={'none'} onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}/> : ''}</Table.Cell>
      <Table.Cell onDoubleClick={onDoubleClick} p={0}>{isEdit ? <Input border={'none'} type='date' defaultValue={moment(new Date()).format('YYYY-MM-DD')} onChange={(e) => setTransaction({ ...transaction, date: new Date(e.target.value) })}/> : ''}</Table.Cell>
      <Table.Cell onDoubleClick={onDoubleClick} p={0}>{isEdit ? <Input border={'none'} onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}/> : ''}</Table.Cell>
    </Table.Row>
  )
}

export default TransactionCreateRow
