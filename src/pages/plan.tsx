import { PlanRange, PlanStatisticsType } from '@/entities/statistics'
import { useGetPlanStatisticsQuery } from '@/entities/statistics/api/statisticsApi'
import EmptyUI from '@/shared/ui/empty'
import { formatDate } from '@/shared/utils/formatPeriod'
import PlanDynamicsChart from '@/widgets/plan/PlanDynamicsChart'
import PlanEnvelopesCard from '@/widgets/plan/PlanEnvelopesCard'
import PlanFundsMatrix from '@/widgets/plan/PlanFundsMatrix'
import PlanRangeTabs from '@/widgets/plan/PlanRangeTabs'
import PlanSummaryCards from '@/widgets/plan/PlanSummaryCards'
import PlanTagsCard from '@/widgets/plan/PlanTagsCard'
import { Button, Grid, GridItem, Heading, Spinner, Text, VStack } from '@chakra-ui/react'
import { CalendarRange } from 'lucide-react'
import { useState } from 'react'

const DEFAULT_RANGE: PlanRange = 'cycle'

const getCaption = ({ from, to, periodsCount }: PlanStatisticsType) => {
  if (!from || !to) return null
  return `${formatDate(from)} — ${formatDate(to)} · циклов: ${periodsCount}`
}

const PlanPage = () => {
  const [range, setRange] = useState<PlanRange>(DEFAULT_RANGE)
  // Данные меняются при каждой транзакции, поэтому при заходе на страницу и смене диапазона грузим заново
  const { data, isLoading, isFetching, isError, refetch } = useGetPlanStatisticsQuery(range, {
    refetchOnMountOrArgChange: true,
  })

  const renderContent = () => {
    if (isLoading) {
      return <VStack width={'100%'} py={16}><Spinner size={'lg'} /></VStack>
    }

    if (isError || !data) {
      return (
        <VStack width={'100%'} py={16} gap={3}>
          <Text color={'label'}>Не удалось загрузить данные плана</Text>
          <Button variant={'secondary'} onClick={refetch}>Повторить</Button>
        </VStack>
      )
    }

    if (data.periodsCount === 0) {
      return (
        <EmptyUI
          icon={<CalendarRange />}
          title={range === 'cycle' ? 'Нет открытого цикла' : 'Нет расчётных циклов'}
          description={'План считается по циклам. Создайте период в разделе «Инструменты».'}
        />
      )
    }

    return (
      <VStack
        width={'100%'}
        align={'start'}
        gap={6}
        // Пока грузится другой диапазон, показываем прежние данные приглушёнными
        opacity={isFetching ? 0.6 : 1}
        transition={'opacity 0.15s'}
      >
        <PlanSummaryCards data={data} />
        <PlanDynamicsChart data={data} />
        <Grid width={'100%'} templateColumns={{ base: '1fr', xl: 'repeat(3, 1fr)' }} gap={4} alignItems={'start'}>
          <GridItem colSpan={2} height={'100%'}>
            <PlanEnvelopesCard categories={data.categories} />
          </GridItem>
          <GridItem colSpan={1}>
            <PlanTagsCard tags={data.tags} />
          </GridItem>
        </Grid>
        <PlanFundsMatrix funds={data.funds} unassignedSpent={data.unassignedSpent} />
      </VStack>
    )
  }

  return (
    <VStack width={'100%'} align={'start'} gap={6}>
      {/* <HStack width={'100%'} justify={'space-between'} align={'start'} wrap={'wrap'} gap={4}> */}
      <VStack align={'start'} gap={0}>
        <Heading>Финансовый план и динамика конвертов</Heading>
        <Text fontSize={'sm'} color={'label'}>Сводный анализ выполнения плана, распределения по конвертам и тегам за все время использования</Text>
        {data && (
          <Text fontSize={'12px'} color={'label'}>
            {getCaption(data)}
          </Text>
        )}
      </VStack>
      <PlanRangeTabs value={range} onChange={setRange} cycleDays={data?.cycleDays} />
      {/* </HStack> */}

      {renderContent()}
    </VStack>
  )
}

export default PlanPage
