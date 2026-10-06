import { TransactionType } from '@/entities/transaction'
import { COLOR } from '@/shared/config/colors'
import { Checkbox, Table, Text } from '@chakra-ui/react'
import TransactionTableRow from './TransactionTableRow'
import TransactionTableActionBar from './TransactionTableActionBar'
import { useState } from 'react'

type Props = {
  transactions: TransactionType[]
  loading?: boolean
}

const TransactionsTable = ({ transactions, loading }: Props) => {
  const [selection, setSelection] = useState<TransactionType[]>([])

  const hasSelection = selection.length > 0
  const indeterminate = hasSelection && selection.length < transactions.length

  if (!loading && transactions.length === 0) {
    return <Text fontSize="sm" color={COLOR.LABEL}>Транзакций нет</Text>
  }

  return (
    <>
      <Table.ScrollArea width="100%" borderRadius={12}>
        <Table.Root size="sm" variant={'primary'} stickyHeader interactive>
          <Table.Header>
            <Table.Row >
              <Table.ColumnHeader w="6">
                <Checkbox.Root
                  size="sm"
                  top="0.5"
                  aria-label="Select all rows"
                  checked={indeterminate ? "indeterminate" : selection.length > 0}
                  onCheckedChange={(changes) => {
                    setSelection(
                      changes.checked ? transactions.map((item) => item) : [],
                    )
                  }}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                </Checkbox.Root>
              </Table.ColumnHeader>
              <Table.ColumnHeader>Дата</Table.ColumnHeader>
              <Table.ColumnHeader>Категория</Table.ColumnHeader>
              <Table.ColumnHeader>Тип</Table.ColumnHeader>
              <Table.ColumnHeader>Описание</Table.ColumnHeader>
              <Table.ColumnHeader>Счета</Table.ColumnHeader>
              <Table.ColumnHeader>Теги</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Сумма</Table.ColumnHeader>
              <Table.ColumnHeader>Действия</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {transactions.map((transaction) => (
              <TransactionTableRow
                key={transaction.id}
                transaction={transaction}
                selection={selection}
                setSelection={setSelection}
              />
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
      <TransactionTableActionBar selection={selection}/>
    </>
  )
}

export default TransactionsTable
