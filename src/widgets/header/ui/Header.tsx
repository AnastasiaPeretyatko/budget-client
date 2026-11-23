import BillingPeriodSelect from '@/features/billing-period-select/BillingPeriodSelect'
import { AddTransactionModal } from '@/features/transaction-management'
import UserAvatar from '@/features/user-avatar/UserAvatar'
import { WorkspaceSelect } from '@/features/workspace-select/WorkspaceSelect'
import { useIsMobile } from '@/shared/hooks/useIsMobile'
import { Box, Button, Heading, HStack, Image, Input, Text, VStack } from '@chakra-ui/react'
import { Plus } from 'lucide-react'

const Header = () => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <HStack width={"100%"} p={4}>
      <HStack flex={1} justify={'start'}>
        <Image src={'/logo.png'} alt='logo' width={'48px'} height={'48px'}/>
        <VStack align={'start'} gap={0}>
          <Heading>FinFlow</Heading>
          <Text fontSize={'xs'} color={'label'}>Бюджет и конверты</Text>
        </VStack>
      </HStack>
    </HStack>
  ) : (
    <HStack width={"100%"} justify={'space-between'} padding={6} divideX={'1px'} gap={4} bg={'bg.body'} paddingInline={'24px'} paddingBlock={'12px'}>
      <HStack flex={1}>
        <WorkspaceSelect/>
        <BillingPeriodSelect/>
        <Input variant={'primary'} placeholder='Поиск...'/>
        <Button variant={'secondary'} disabled><Plus/> Из шаблона</Button>
        <AddTransactionModal nameButton='Транзакция'/>
      </HStack>
      <Box paddingLeft={2}>
        <UserAvatar/>
      </Box>
    </HStack>
  )
}

export default Header
