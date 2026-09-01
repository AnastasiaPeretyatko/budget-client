import AddBillingPeriodButton from '@/features/billing_period/AddBillingPerodButton';
import DashboardSummaryCards from '@/widgets/dashboard/DashboardSummaryCards';
import DashboardActivityCalendar from '@/widgets/dashboard/DashboardActivityCalendar';
import DashboardTransactions from '@/widgets/dashboard/DashboardTransactions';
import { Heading, HStack, Link, VStack } from '@chakra-ui/react';
import { COLOR } from '@/shared/config/colors';
import { SavingAccountList } from '@/widgets/saving-account-list';
import NextLink from 'next/link';
import WelcomeHeader from '@/features/dashboard/WelcomeHeader';
import moment from 'moment';

export default function DashboardPage() {
  return (
    <VStack width={'100%'} align={'start'} gap={6}>
      <HStack width={'100%'} justify={'space-between'}>
        <Heading>Главная {moment().format('LL')}</Heading>
        <AddBillingPeriodButton/>
      </HStack>

      <WelcomeHeader/>
      <VStack width={'100%'} align={'start'} gap={6}>
        <DashboardSummaryCards/>
        <DashboardActivityCalendar/>
        <VStack width={'100%'} align={'start'} gap={3}>
          <HStack width={'100%'} justify={'space-between'}>
            <Heading size={'md'}>Мои накопительные</Heading>
            <Link as={NextLink} href={'/budgets'} fontSize={'sm'} color={COLOR.PRIMARY_COLOR}>
              Все накопительные &rsaquo;
            </Link>
          </HStack>
          <SavingAccountList isDisplayCreteModal limit={3} />
        </VStack>
        <DashboardTransactions />
      </VStack>
    </VStack>
  );
}
