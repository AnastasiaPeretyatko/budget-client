import { TransactionType } from '@/entities/transaction';
import { TYPE_CONFIG } from '@/entities/transaction/constants/transaction-type';
import { formattingMonay } from '@/shared/utils/formattingMonay';
import { ActionBar, Box, Portal, Text } from '@chakra-ui/react'
import { useMemo } from 'react';

type Props = {
  selection: TransactionType[];
}

const TransactionTableActionBar = ({ selection }: Props) => {
  const hasSelection = selection.length > 0

  const sum = useMemo(() => {
    return selection.reduce((acc, item) => {
      const config = TYPE_CONFIG[item.type]
      return acc + Number(`${config.sign}${item.amount}`)
    }, 0)
  }, [selection])

  return (
    <ActionBar.Root open={hasSelection}>
      <Portal>
        <ActionBar.Positioner>
          <ActionBar.Content>
            <ActionBar.SelectionTrigger>
              Выбрано: {selection.length}
            </ActionBar.SelectionTrigger>
            <ActionBar.Separator />
            <Box><Text>Итого: {formattingMonay(sum)}</Text></Box>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </Portal>
    </ActionBar.Root>
  )
}

export default TransactionTableActionBar
