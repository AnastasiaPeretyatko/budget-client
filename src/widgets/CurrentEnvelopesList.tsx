import { useGetEnvelopesQuery } from '@/entities/envelope/api/envelopesApi'
import { SavingAccountCard } from '@/entities/saving-account'
import { Box, Grid, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import { MailIcon } from 'lucide-react'

const CurrentEnvelopesList = () => {
  const { data, isLoading } = useGetEnvelopesQuery()

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <VStack width={'100%'}>
      <HStack width={'100%'}>
        <Box p={'10px'} bg={'#F1F5F9'} borderRadius={'12px'}><MailIcon/></Box>
        <VStack align={'start'} gap={0}>
          <Heading fontSize={'16px'}>Текущие конверты на период</Heading>
          <Text fontSize={'12px'} color={'#94A3B8'}>Суммы, предназначенные для расходования до 3 сентября</Text>
        </VStack>
      </HStack>

      <Grid width={'100%'} templateColumns={"repeat(4, 1fr)"} gap={4}>
        {
          data?.map(acc => <SavingAccountCard key={acc.id} savingAccount={acc}/>)
        }
      </Grid>

    </VStack>
  )
}

export default CurrentEnvelopesList
