import AddBillingPeriodButton from '@/features/billing_period/AddBillingPerodButton';
import DashboardActivityCalendar from '@/widgets/dashboard/DashboardActivityCalendar';
import DashboardTransactions from '@/widgets/dashboard/DashboardTransactions';
import { Flex, Heading, HStack, Link, VStack } from '@chakra-ui/react';
import { COLOR } from '@/shared/config/colors';
import { SavingAccountList } from '@/widgets/saving-account-list';
import NextLink from 'next/link';
import WelcomeHeader from '@/features/dashboard/WelcomeHeader';
import moment from 'moment';
import AddTransactionDrawer from '@/features/transaction-management/ui/AddTransactionDrawer';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { WorkspaceSelect } from '@/features/workspace-select/WorkspaceSelect';
import BillingPeriodSelect from '@/features/billing-period-select/BillingPeriodSelect';
import DashboardSummaryCards from '@/widgets/dashboard/DashboardSummaryCards';
import SavingAccountListCarousel from '@/widgets/saving-account-list/SavingAccountListCarousel';

const ACCOUNT_LIMIT = 3

export default function DashboardPage() {
  const isMobile = useIsMobile()

  return (
    <VStack width={'100%'} align={'start'} gap={{ base: 4, lg: 6 }}>
      {
        !isMobile && (
          <Flex flexDir={{ base: 'column', lg: 'row' }} width={'100%'} justify={'space-between'}>
            <Heading>Сегодня {moment().format('LL')}</Heading>
            <HStack>
              <AddBillingPeriodButton/>
              <AddTransactionDrawer/>
            </HStack>
          </Flex>
        )
      }

      <WelcomeHeader/>
      <VStack width={'100%'} align={'start'}  gap={{ base: 4, lg: 6 }}>
        {isMobile && (
          <HStack width={'100%'}>
            <WorkspaceSelect/>
            <BillingPeriodSelect/>
          </HStack>
        )}
        <DashboardSummaryCards/>
        {!isMobile && <DashboardActivityCalendar/>}
        <VStack width={'100%'} align={'start'} gap={3}>
          <HStack width={'100%'} justify={'space-between'}>
            <Heading size={'md'}>Мои накопительные</Heading>
            <Link as={NextLink} href={'/budgets'} fontSize={'sm'} color={COLOR.PRIMARY_COLOR}>
              Все накопительные &rsaquo;
            </Link>
          </HStack>
          {
            isMobile ?
              <SavingAccountListCarousel/> :
              <SavingAccountList limit={ACCOUNT_LIMIT} />
          }
        </VStack>
        <DashboardTransactions />
      </VStack>
    </VStack>
  );
}
