import AddBillingPeriodButton from '@/features/billing_period/AddBillingPerodButton';
import { SavingAccountList } from '@/widgets/saving-account-list';
import DashboardTransactions from '@/widgets/dashboard/DashboardTransactions';
import DashboardSummaryCards from '@/widgets/dashboard/DashboardSummaryCards';
import DashboardActivityCalendar from '@/widgets/dashboard/DashboardActivityCalendar';
import { Grid, GridItem, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { COLOR } from '@/shared/config/colors';

export default function DashboardPage() {
  return (
    <VStack width={'100%'} align={'start'} gap={6}>
      <HStack width={'100%'} justify={'space-between'}>
        <Heading>Dashboard</Heading>
        <AddBillingPeriodButton/>
      </HStack>

      <VStack width={'100%'} align={'start'} gap={0}>
        {/* TODO нужно вывести имя пользователя + пока нигде его не храним */}
        <Text>Привет, {''}! 👋</Text>
        <Text color={COLOR.LABEL} fontSize={'sm'}>Вот что происходит с вашими финансами</Text>
      </VStack>

      <Grid width={'100%'} templateColumns="2fr 1fr" gap={6}>
        <GridItem>
          <VStack width={'100%'} align={'start'} gap={6}>
            <DashboardSummaryCards/>
            <DashboardActivityCalendar/>
            {/* <DashboardAnalytics/> */}
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
