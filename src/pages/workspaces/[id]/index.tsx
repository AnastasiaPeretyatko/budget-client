import Header from '@/features/Header/Header';
import SavingAccountList from '@/widgets/saving-account-list/SavingAccountList';
import Sidebar from '@/widgets/sidebar/Sidebar';
import { Container } from '@chakra-ui/react';

export default function DashboardPage() {
  return (
    <Container width={'100%'} display={'flex'} flexDirection={'column'} gap={4} padding={0} margin={0}>
      <Header/>
      <Sidebar/>
      <SavingAccountList/>
      {/* <VStack align={'start'} gap={4} paddingX={6}>
        <ListSaving/>
        <HeaderTransitionTable/>
        <TransactionTable/>
      </VStack> */}
    </Container>
  );
}
