import { useGetEnvelopesQuery } from '@/entities/envelope/api/envelopesApi'
import { SavingAccountCard } from '@/entities/saving-account'
import { Box, Grid, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import { MailIcon } from 'lucide-react'
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import { useBatchMutation } from '@/entities/envelope/api/envelopApi';

const CurrentEnvelopesList = () => {
  const { data, isLoading } = useGetEnvelopesQuery()
  const [batch] = useBatchMutation()

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
      <DragDropProvider
        onDragEnd={async(event, manager) => {
          if (event.canceled) return;

          const { source } = event.operation;
          if (!isSortable(source) || !data) return;

          const { initialIndex, index } = source;
          if (initialIndex === index) return;

          const newItems = [...data];
          const [removed] = newItems.splice(initialIndex, 1);
          newItems.splice(index, 0, removed);

          const from = Math.min(initialIndex, index);
          const to = Math.max(initialIndex, index);
          const payload = newItems
            .slice(from, to + 1)
            .map((item, i) => ({ id: item.id, index: from + i }));

          await batch(payload);
        }}
      >
        <Grid width={'100%'} templateColumns={"repeat(4, 1fr)"} gap={4}>
          {
            data?.map(acc => <SavingAccountCard key={acc.id} savingAccount={acc}/>)
          }
        </Grid>
      </DragDropProvider>
    </VStack>
  )
}

export default CurrentEnvelopesList
