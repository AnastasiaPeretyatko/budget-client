import { useAppDispatch, useAppSelector } from '@/app/store'
import { COLOR } from '@/shared/config/colors'
import { Button, Card, Flex, HStack, Input, Link, Spinner, Text, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { fetchBillingPeriodsThunk } from '@/entities/bulling-period'
import BillingCard from '../billing_period/BillingCard'
import { BsCalendarEvent } from 'react-icons/bs'

const BillingToolCard = () => {
  const dispatch = useAppDispatch()

  const { billingPeriods, isLoading } = useAppSelector(state => state.billingPeriod)

  useEffect(() => {
    dispatch(fetchBillingPeriodsThunk())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Card.Root p={2} display={'flex'} flexDir={'column'} gap={4} alignItems={'center'}>
      <VStack height={'100%'} width={'100%'}>
        <HStack width={'100%'} gap={4}>
          <Flex justify={'center'} align={'center'} p={4} borderRadius={10} background={COLOR.EXPENSE_TEXT} color={'white'}><BsCalendarEvent/></Flex>
          <VStack align={'start'} gap={0} width={'100%'}>
            <Text>Платежные периоды</Text>
            <Text fontSize={'sm'} color={COLOR.LABEL}>8 периодов</Text>
          </VStack>
          <Button size={'sm'} variant={'subtle'}>Управление {'>'}</Button>
        </HStack>
        <Input placeholder='Поиск категории...'/>
        <VStack width={'100%'} borderRadius={4} borderColor={'gray.800'} borderWidth={'1px'}>
          {
            billingPeriods.map(billing => <BillingCard  key={billing.id}  billing={billing}/>)
          }
        </VStack>
      </VStack>

      <Link color={'blue.400'}>Посмотреть все периоды</Link>
    </Card.Root>
  )
}

export default BillingToolCard
