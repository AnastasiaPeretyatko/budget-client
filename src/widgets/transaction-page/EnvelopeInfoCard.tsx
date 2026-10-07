import { useGetEnvelopeQuery } from '@/entities/envelope/api/envelopApi'
import SavingAccountToggle from '@/features/saving-account-management/ui/SavingAccountToggle'
import SavingSettingsModal from '@/features/saving-account-management/ui/SavingSettingsModal'
import { AddTransactionModal } from '@/features/transaction-management'
import Label from '@/shared/ui/label'
import { formattingMonay } from '@/shared/utils/formattingMonay'
import { Badge, Card, Heading, HStack, Spinner, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const EnvelopeInfoCard = () => {
  const router = useRouter()

  const { data, isLoading } = useGetEnvelopeQuery(router.query?.id as string || '', { skip: !router.query.id })

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <Card.Root variant={'primary'} width={'100%'} gap={4}>
      <HStack width={'100%'} justify={'space-between'}>
        <HStack>
          <Heading fontSize={'18px'}>{data?.name} </Heading>
          <SavingAccountToggle/>
          <Badge variant={!!data?.deletedAt ? 'yellow' : 'green'}>{!!data?.deletedAt ? 'Archived' : 'Active'}</Badge>
          {data?.isSafe && <Badge>Сейф</Badge>}
        </HStack>

        <HStack>
          {data && <AddTransactionModal envelope={data} nameButton='Добавить расход'/>}
          {data && <SavingSettingsModal envelope={data}/>}
        </HStack>
      </HStack>
      <VStack width={'100%'} align={'start'} gap={0}>
        <Label>Остаток в конверте</Label>
        <Heading fontSize={'24px'}>{formattingMonay(data?.amount)}</Heading>
      </VStack>
    </Card.Root>
  )
}

export default EnvelopeInfoCard
