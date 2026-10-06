import { useAppSelector } from '@/app/store'
import Label from '@/shared/ui/label'
import formatPeriod from '@/shared/utils/formatPeriod'
import { Card, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { BanknoteIcon, CalendarIcon } from 'lucide-react'
import { CreateSavingModal } from './saving-account-management'
import { useGetPeriodsQuery } from '@/entities/bulling-period/api/billing-periodApi'
import { useEffect, useState } from 'react'
import { BillingPeriodType } from '@/entities/bulling-period'

const GeneralEnvelopePoolCard = () => {
  const { data: billingPeriods, isLoading } = useGetPeriodsQuery()
  const [period, setPeriod] = useState<BillingPeriodType | null>()
  const currentId = useAppSelector(state => state.selectedPeriod.selectedPeriodId)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPeriod(billingPeriods?.find(b => b.id === currentId))
  }, [billingPeriods, currentId])

  return (
    <Card.Root width={'100%'} variant={'primary'} gap={4}>
      <HStack width={'100%'} align={'start'} gap={4} divideX={'1px'}>
        <HStack minW={'max-content'} align={'start'}>
          <Flex align={'center'} justify={'center'} borderRadius={'16px'} bg={'#ECFDF5'} padding={'12px'}>
            <BanknoteIcon color='#059669'/>
          </Flex>
          <VStack align={'start'}>
            <Label>Общий пул конвертов</Label>
            <Heading fontSize={'30px'}>482 500 ₽</Heading>
          </VStack>
        </HStack>

        <VStack width={'100%'} align={'start'} pl={4}>
          <Label>Рабочий цикл конвертов</Label>
          <HStack>
            <CalendarIcon size={'16px'} color='#64748B'/>
            <Text fontSize={'14px'} fontWeight={'bold'}>{formatPeriod(period?.startDate || '', period?.endDate || '')}</Text>
          </HStack>
        </VStack>
      </HStack>

      <HStack width={'100%'} align={'start'}>
        <CreateSavingModal/>
      </HStack>
    </Card.Root>
  )
}

export default GeneralEnvelopePoolCard
