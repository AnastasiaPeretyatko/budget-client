import AddBillingPerodButton from '@/features/billing_period/AddBillingPerodButton';
import { SavingAccountList } from '@/widgets/saving-account-list';
import { Heading, HStack, VStack } from '@chakra-ui/react';

export default function DashboardPage() {
  return (
    <VStack width={'100%'} align={'start'}>
      <HStack width={'100%'} justify={'space-between'}>
        <Heading>Dashboard</Heading>
        <AddBillingPerodButton/></HStack>
      <SavingAccountList/>
    </VStack>
  );
}
