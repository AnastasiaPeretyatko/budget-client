// import { Box, Card, CardRoot, Collapsible, HStack, Text, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { TransactionType } from '../types/transaction.type'
import { Box, Card, HStack, Text, VStack } from '@chakra-ui/react';
import { COLOR } from '@/shared/config/colors';
import { FaArrowRightLong } from 'react-icons/fa6';
// import { COLOR } from '@/shared/config/colors';
// import { LuChevronRight } from 'react-icons/lu';
// import { FaArrowRightLong } from 'react-icons/fa6';

type Props = {
  accountId?: string;
  transaction: TransactionType
}

const TransactionCard = ({ accountId, transaction }: Props) => {
  const isExpense = useMemo(() => {
    if (accountId) return accountId === transaction.fromAccountId
    return !!transaction.fromAccount && !transaction.toAccount
  }, [accountId, transaction.fromAccountId, transaction.fromAccount, transaction.toAccount])

  return (
  // <Card.Root width={'100%'} margin={0} padding={0} borderRadius={12} border={'none'}>
  //   <Collapsible.Root>
  //     <Collapsible.Trigger width={'100%'} cursor={'pointer'}>
  //       <Card.Body width={'100%'} padding={4}>
  //         <HStack width={'100%'} gap={4}>
  //           <Box minW={16} minH={16} borderRadius={'50%'} backgroundColor={'gray.900'}></Box>
  //           <VStack width={'100%'} align={'start'}>
  //             <Text fontSize={'lg'} fontWeight={800} color={!isExpense ? COLOR.INCOME_TEXT : ''}>
  //               {!isExpense && '+'} {transaction.amount} ₽
  //             </Text>
  //             <Text color={'gray.300'} fontSize={'sm'}>{transaction.category?.name}</Text>
  //           </VStack>
  //           <Collapsible.Indicator
  //             transition="transform 0.2s"
  //             _open={{ transform: "rotate(90deg)" }}
  //           >
  //             <LuChevronRight />
  //           </Collapsible.Indicator>
  //         </HStack>
  //       </Card.Body>
  //     </Collapsible.Trigger>

  //     <Collapsible.Content width={'100%'} borderTop={`1px solid ${COLOR.BORDER}`}>
  //       <Card.Footer padding={4}>
  //         <HStack width={'100%'} gap={2}>
  //           <Text>{transaction.fromAccount?.name || "Наличные"}</Text>
  //           <FaArrowRightLong />
  //           <Text>{transaction.toAccount?.name || "Наличные"}</Text>
  //         </HStack>
  //       </Card.Footer>

  //     </Collapsible.Content>
  //   </Collapsible.Root>

    // </Card.Root>
    <Card.Root width={'100%'} margin={0} padding={0} borderRadius={12} border={'none'}>
      <Card.Body display={'flex'} flexDir={'row'} gap={2} alignItems={'center'}>
        <Box minW={12} minH={12} borderRadius={'50%'} backgroundColor={'gray.900'} display="flex" alignItems="center" justifyContent="center" fontSize="xl">
          {transaction.category?.icon}
        </Box>
        <VStack width={'100%'} align={'start'}>
          <Text fontWeight={600}>{transaction.category?.name}</Text>
          {transaction.createdBy && <HStack>
            {/* <BaseAvatar size='xs' name={transaction.createdBy?.email}/> */}
            <Text fontSize={'xs'} color={COLOR.LABEL}>{transaction.createdBy?.email}</Text>
          </HStack>}
        </VStack>
        <VStack width={'20%'} align={'end'}>
          <HStack width={'100%'} gap={2} fontSize={'sm'}>
            <Text>{transaction.fromAccount?.name || "Наличные"}</Text>
            <FaArrowRightLong />
            <Text>{transaction.toAccount?.name || "Наличные"}</Text>
          </HStack>
          <Text fontSize={'md'} fontWeight={800} color={!isExpense ? COLOR.INCOME_TEXT : ''}>
            {!isExpense ? '+' : '-'} {transaction.amount} ₽
          </Text>
        </VStack>

      </Card.Body>
    </Card.Root>
  )
}

export default TransactionCard
