import { RootState, useAppDispatch } from '@/app/store'
import { resetSelectedTransactions } from '@/entities/transaction/api/transaction.slice'
import { Button, Card, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const CalculationCard = () => {
  const dispatch = useAppDispatch()
  const { selectedTransactions } = useSelector((state: RootState) => state.transactions)

  if (!selectedTransactions || selectedTransactions.length === 0) {
    return null
  }

  return (
    <Card.Root
      width={'100%'}
      flexDirection={'column'}
      gap={1}
      position={'relative'}
      borderRadius={6}
      // background={'#fff'}
      // _before={{
      //   content: "' '",
      //   position: 'absolute',
      //   bottom: '-10px',
      //   left: 0,
      //   right: 0,
      //   height: '10px',
      //   background: 'radial-gradient(circle, transparent, transparent 50%, #111111 50%, #111111 100%)',
      //   backgroundSize: '20px 20px'
      // }}
    >
      <Heading size={'md'} p={4}>
        Расчёт
      </Heading>
      <VStack width={'100%'} align={'start'} gap={1} px={4}>
        {
          selectedTransactions?.map(tr => (
            <Text key={tr.id} fontSize={'xs'}>
              {tr.category?.name || tr.description} - {tr.amount} ₽
            </Text>
          ))
        }
      </VStack>
      <Card.Footer width={'100%'} display="flex" flexDir={'column'} justifyContent="space-between" alignItems="center" gap={3} p={4}>
        <HStack width={'100%'}>
          <Text>Итого</Text>
          <Text>{selectedTransactions?.reduce((sum, tr) => sum + (+tr.amount), 0)} ₽</Text>

        </HStack>
        <Button onClick={() => dispatch(resetSelectedTransactions())}>Сбросить выбор</Button>
      </Card.Footer>
    </Card.Root>
  )
}

export default CalculationCard
