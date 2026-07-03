import { useMemo, useRef, useState } from 'react'
import { TransactionType, TransactionTypeEnum } from '../types/transaction.type'
import { Badge, Box, Button, CloseButton, Dialog, HStack, IconButton, Portal, Text, VStack } from '@chakra-ui/react'
import { COLOR } from '@/shared/config/colors'
import { FaArrowRightLong } from 'react-icons/fa6'
import { LuArrowDown, LuArrowUp, LuArrowLeftRight, LuPencil, LuTrash2 } from 'react-icons/lu'
import { AppDispatch } from '@/app/store'
import { useDispatch } from 'react-redux'
import { deleteTransactionThunk } from '@/entities/transaction'
import DropdownMenu from '@/shared/ui/menu'
import { useNotifications } from '@/shared/hooks/useNotifications'
import moment from 'moment'
import EditTransactionModal from '@/features/transaction-management/ui/EditTransactionModal'

type Props = {
  accountId?: string
  transaction: TransactionType
}

const TAG_COLORS = [
  'purple', 'teal', 'blue', 'cyan', 'green', 'orange', 'pink', 'red', 'yellow',
]

function getTagColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length]
}

const TransactionCard = ({ accountId, transaction }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const { showSuccessMessage, showErrorMessage } = useNotifications()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const editTriggerRef = useRef<HTMLDivElement>(null)

  const isExpense = useMemo(() => {
    if (accountId) return accountId === transaction.fromAccountId
    return transaction.type === TransactionTypeEnum.EXPENSE
  }, [accountId, transaction])

  const isTransfer = transaction.type === TransactionTypeEnum.TRANSFER

  const iconConfig = useMemo(() => {
    if (isTransfer) return { icon: <LuArrowLeftRight />, bg: 'blue.900', color: 'blue.400' }
    if (isExpense) return { icon: <LuArrowUp />, bg: 'red.900', color: 'red.400' }
    return { icon: <LuArrowDown />, bg: 'green.900', color: 'green.400' }
  }, [isExpense, isTransfer])

  const amountColor = isExpense ? COLOR.DANGER_TEXT : COLOR.INCOME_TEXT

  const formattedAmount = useMemo(() => {
    const num = parseFloat(transaction.amount)
    return num.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }, [transaction.amount])

  const time = moment(transaction.date).format('HH:mm')

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

  return (
    <HStack
      width="100%"
      px={4}
      py={3}
      borderRadius={12}
      bg="gray.900"
      gap={3}
      align="center"
      _hover={{ bg: 'gray.800' }}
      transition="background 0.15s"
    >
      {/* Icon */}
      <Box
        minW={10}
        minH={10}
        w={10}
        h={10}
        borderRadius="50%"
        bg={iconConfig.bg}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="xl"
        color={iconConfig.color}
        flexShrink={0}
      >
        {transaction.category?.icon ?? iconConfig.icon}
      </Box>

      {/* Title + subtitle + tags */}
      <VStack align="start" gap={2} flex={1} minW={0}>
        <Text fontWeight={600} fontSize="sm" lineClamp={1}>
          {transaction.description || transaction.category?.name || '—'}
        </Text>
        {transaction.category?.description && (
          <Text fontSize="xs" color={COLOR.LABEL} lineClamp={1}>
            {transaction.category.description}
          </Text>
        )}
        {(transaction.category?.name || transaction.tags?.length) && (
          <HStack gap={1} flexWrap="wrap" mt={0.5}>
            {transaction.category?.name && (
              <Badge
                size="sm"
                colorPalette={getTagColor(transaction.category.name)}
                borderRadius="full"
                px={2}
                fontSize="2xs"
              >
                {transaction.category.name}
              </Badge>
            )}
            {transaction.tags?.map(tag => (
              <Badge
                key={tag.id}
                size="sm"
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
        )}
      </VStack>

      {/* Route + time/author */}
      <VStack align="end" gap={0.5} flexShrink={0} minW="160px">
        <HStack gap={1} fontSize="xs" color={COLOR.LABEL}>
          <Text>{transaction.fromAccount?.name ?? 'Наличные'}</Text>
          <FaArrowRightLong />
          <Text>{transaction.toAccount?.name ?? 'Наличные'}</Text>
        </HStack>
        <HStack gap={1} fontSize="xs" color={COLOR.LABEL}>
          <Text>{time}</Text>
          {transaction.createdBy && (
            <>
              <Text>•</Text>
              <Text>
                {
                  transaction.createdBy.firstName + ' ' + transaction.createdBy.lastName ||
                  transaction.createdBy.email
                }
              </Text>
            </>
          )}
        </HStack>
      </VStack>

      {/* Amount */}
      <Text
        fontSize="md"
        fontWeight={800}
        color={amountColor}
        flexShrink={0}
        minW="100px"
        textAlign="right"
      >
        {isExpense ? '-' : '+'}{formattedAmount} ₽
      </Text>

      {/* Menu */}
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
      {/* TODO Вынести в отдельный компонент */}
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
    </HStack>
  )
}

export default TransactionCard
