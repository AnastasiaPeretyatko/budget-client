import React from 'react'
import EnvelopeSelect from './EnvelopeSelect'
import { ChevronDown } from 'lucide-react'
import { IconButton, VStack } from '@chakra-ui/react'
import { Control, useController } from 'react-hook-form'
import { TransactionFormType } from '@/entities/transaction'

type Props = {
  control: Control<TransactionFormType>
}

const EnvelopeSelectWrapper = ({ control }: Props) => {
  const { field: from } = useController({ control, name: 'fromAccountId' })
  const { field: to } = useController({ control, name: 'toAccountId' })

  const handleReverseAccount = () => {
    const account = from.value
    from.onChange(to.value)
    to.onChange(account)
  }

  return (
    <VStack width={'100%'} align={'center'} gap={1}>
      <EnvelopeSelect accountId={from.value} onChange={from.onChange} label='С какого конверта' />
      <IconButton variant={'ghost'} onClick={handleReverseAccount}><ChevronDown size={'16px'}/></IconButton>
      <EnvelopeSelect accountId={to.value} onChange={to.onChange} label='В какой конверт зачислить' />
    </VStack>
  )
}

export default EnvelopeSelectWrapper
