import { useMemo, useRef, useState } from 'react'
import { TransactionType, TransactionTypeEnum, deleteTransactionThunk } from '@/entities/transaction'
import {
  Badge,
  Box,
  Button,
  CloseButton,
  Dialog,
  HStack,
  IconButton,
  Portal,
  Table,
  Text,
} from '@chakra-ui/react'
import { COLOR } from '@/shared/config/colors'
import { FaArrowRightLong } from 'react-icons/fa6'
import { LuPencil, LuTrash2 } from 'react-icons/lu'
import { AppDispatch } from '@/app/store'
import { useDispatch } from 'react-redux'
import DropdownMenu from '@/shared/ui/menu'
import { useNotifications } from '@/shared/hooks/useNotifications'
import moment from 'moment'
import EditTransactionModal from '@/features/transaction-management/ui/EditTransactionModal'

type Props = {
  transaction: TransactionType
}

const TYPE_CONFIG = {
  [TransactionTypeEnum.EXPENSE]: { label: 'Расход', palette: 'red', color: COLOR.DANGER_TEXT, sign: '-' },
  [TransactionTypeEnum.INCOME]: { label: 'Доход', palette: 'green', color: COLOR.INCOME_TEXT, sign: '+' },
  [TransactionTypeEnum.TRANSFER]: { label: 'Перевод', palette: 'blue', color: COLOR.PERIOD_TEXT, sign: '' },
} as const

const TransactionTableRow = ({ transaction }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { showSuccessMessage, showErrorMessage } = useNotifications()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const editTriggerRef = useRef<HTMLDivElement>(null)

  const config = TYPE_CONFIG[transaction.type]

  const formattedAmount = useMemo(() => {
    const num = parseFloat(transaction.amount)
    return num.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }, [transaction.amount])

  const handleDelete = () => {
    dispatch(deleteTransactionThunk(transaction.id))
      .unwrap()
      .then(() => {
        showSuccessMessage('Транзакция удалена')
        setDeleteOpen(false)
      })
      .catch(() => showErrorMessage('Ошибка при удалении'))
  }

  const menuItems = [
    {
      value: 'edit',
      label: 'Редактировать',
      icon: <LuPencil />,
      onClick: () => editTriggerRef.current?.click(),
    },
    {
      value: 'delete',
      label: 'Удалить',
      icon: <LuTrash2 />,
      color: COLOR.DANGER_TEXT,
      onClick: () => setDeleteOpen(true),
    },
  ]

  const isTransfer = transaction.type === TransactionTypeEnum.TRANSFER
  const isIncome = transaction.type === TransactionTypeEnum.INCOME
  const fromName = transaction.fromAccount?.name ?? '—'
  const toName = transaction.toAccount?.name ?? '—'

  return (
    <Table.Row>
      <Table.Cell whiteSpace="nowrap" color={COLOR.LABEL} fontSize="xs">
        {moment(transaction.date).format('DD.MM.YY HH:mm')}
      </Table.Cell>
      <Table.Cell>
        <Badge colorPalette={config.palette} borderRadius="full" px={2} fontSize="2xs">
          {config.label}
        </Badge>
      </Table.Cell>
      <Table.Cell>{transaction.category?.name ?? '—'}</Table.Cell>
      <Table.Cell maxW="240px">
        <Text lineClamp={1}>{transaction.description || '—'}</Text>
      </Table.Cell>
      <Table.Cell>
        {isTransfer ? (
          <HStack gap={1} fontSize="xs" color={COLOR.LABEL}>
            <Text>{fromName}</Text>
            <FaArrowRightLong />
            <Text>{toName}</Text>
          </HStack>
        ) : (
          <Text fontSize="xs" color={COLOR.LABEL}>{isIncome ? toName : fromName}</Text>
        )}
      </Table.Cell>
      <Table.Cell>
        <HStack gap={1} flexWrap="wrap">
          {transaction.tags?.map((tag) => (
            <Badge
              key={tag.id}
              borderRadius="full"
              px={2}
              fontSize="2xs"
              style={{
                backgroundColor: tag.color + '28',
                color: tag.color,
                border: `1px solid ${tag.color}55`,
              }}
            >
              {tag.name}
            </Badge>
          ))}
        </HStack>
      </Table.Cell>
      <Table.Cell textAlign="end" color={config.color} fontWeight={700} whiteSpace="nowrap">
        {config.sign}{formattedAmount} ₽
      </Table.Cell>
      <Table.Cell textAlign="end">
        <DropdownMenu
          buttonTrigger={
            <IconButton variant="ghost" size="sm" aria-label="actions" color={COLOR.LABEL}>
              <Text fontSize="lg" lineHeight={1}>⋮</Text>
            </IconButton>
          }
          menuItems={menuItems}
        />
        <EditTransactionModal
          transaction={transaction}
          trigger={<Box ref={editTriggerRef} display="none" />}
        />
        <Dialog.Root
          size="sm"
          placement="center"
          open={deleteOpen}
          onOpenChange={(e) => setDeleteOpen(e.open)}
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Удаление транзакции</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Text>
                    Вы уверены, что хотите удалить эту транзакцию? Это действие необратимо.
                  </Text>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Отмена</Button>
                  </Dialog.ActionTrigger>
                  <Button colorPalette="red" onClick={handleDelete}>Удалить</Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </Table.Cell>
    </Table.Row>
  )
}

export default TransactionTableRow
