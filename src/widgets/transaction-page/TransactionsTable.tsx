import { TransactionType } from '@/entities/transaction'
import { COLOR } from '@/shared/config/colors'
import { Table, Text } from '@chakra-ui/react'
import TransactionTableRow from './TransactionTableRow'

type Props = {
  transactions: TransactionType[]
  loading?: boolean
}

const TransactionsTable = ({ transactions, loading }: Props) => {
  if (!loading && transactions.length === 0) {
    return <Text fontSize="sm" color={COLOR.LABEL}>Транзакций нет</Text>
  }

  return (
    <Table.ScrollArea width="100%" borderRadius={12}>
      <Table.Root size="sm" stickyHeader interactive>
        <Table.Header>
          <Table.Row >
            <Table.ColumnHeader>Дата</Table.ColumnHeader>
            <Table.ColumnHeader>Тип</Table.ColumnHeader>
            <Table.ColumnHeader>Категория</Table.ColumnHeader>
            <Table.ColumnHeader>Описание</Table.ColumnHeader>
            <Table.ColumnHeader>Счета</Table.ColumnHeader>
            <Table.ColumnHeader>Теги</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Сумма</Table.ColumnHeader>
            <Table.ColumnHeader />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {transactions.map((transaction) => (
            <TransactionTableRow key={transaction.id} transaction={transaction} />
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}

export default TransactionsTable
