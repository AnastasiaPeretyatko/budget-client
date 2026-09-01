import { BillingPeriodType } from '@/entities/bulling-period'
import { COLOR } from '@/shared/config/colors'
import BaseTag from '@/shared/ui/tag'
import { Button, HStack, Text } from '@chakra-ui/react'

const BillingCard = ({ billing }: {billing: BillingPeriodType}) => {
  return (
    <HStack width={'100%'} p={2} cursor={'pointer'}>
      <HStack width={'100%'}>
        <Text>{billing.startDate} - {billing.endDate}</Text>
        <BaseTag colorPalette={billing.status === 'active' ? 'green' : 'gray'}>
          {billing.status === 'active' ? 'Активный' : 'Завершён'}
        </BaseTag>
      </HStack>
      <Button size={'sm'} color={COLOR.LABEL} variant={'ghost'}>{'>'}</Button>
    </HStack>
  )
}

export default BillingCard
