import CategoryIcon from '@/entities/category/ui/CategoryIcon'
import { TransactionType } from '@/entities/transaction'
import { formattingMonay } from '@/shared/utils/formattingMonay'
import { Heading, HStack, Text, VStack } from '@chakra-ui/react'
import moment from 'moment'

type Props = {
  transaction: TransactionType
}

const TransactionCard = ({ transaction }: Props) => {
  return (
    <HStack width={'100%'} _notLast={{ borderBottom: '1px solid', borderColor: 'divide' }} py={2}>
      <HStack width={'100%'}>
        <CategoryIcon icon={transaction.category?.icon} color={transaction.category?.color}/>
        <VStack flex={1} gap={0} align={'start'}>
          <Text fontSize={'md'}>{transaction.description}</Text>
          <Text fontSize={'12px'} color={'label'}>{transaction.category?.name}</Text>
        </VStack>
        <VStack align={'end'}>
          <Heading size={'md'}>{formattingMonay(transaction.amount)}</Heading>
          <Text fontSize={'12px'} color={'label'}>{moment(transaction.date).format('ll')}</Text>
        </VStack>
      </HStack>
    </HStack>
  )
}

export default TransactionCard
