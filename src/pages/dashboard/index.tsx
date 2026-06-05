import AddBillingPerodButton from '@/features/billing_period/AddBillingPerodButton';
import { SavingAccountList } from '@/widgets/saving-account-list';
import DashboardAnalytics from '@/widgets/dashboard/DashboardAnalytics';
import DashboardTransactions from '@/widgets/dashboard/DashboardTransactions';
import DashboardSummaryCards from '@/widgets/dashboard/DashboardSummaryCards';
import DashboardActivityCalendar from '@/widgets/dashboard/DashboardActivityCalendar';
import { Grid, GridItem, Heading, HStack, VStack } from '@chakra-ui/react';

export default function DashboardPage() {
  return (
    <VStack width={'100%'} align={'start'} gap={6}>
      <HStack width={'100%'} justify={'space-between'}>
        <Heading>Dashboard</Heading>
        <AddBillingPerodButton/>
      </HStack>

      <Grid width={'100%'} templateColumns="2fr 1fr" gap={6}>
        <GridItem>
          <VStack width={'100%'} align={'start'} gap={6}>
            <DashboardSummaryCards/>
            <DashboardActivityCalendar/>
            <DashboardAnalytics/>
            <DashboardTransactions/>
          </VStack>
        </GridItem>
        <GridItem>
          <SavingAccountList direction="column"/>
        </GridItem>
      </Grid>
    </VStack>
  );
}
