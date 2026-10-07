import { useGetPeriodSummaryQuery } from '@/entities/billing-period/api/billing-periodApi'
import { BillingPeriodHistoryItem } from '@/entities/billing-period/types/billing-period.type'
import { PERIOD_DELTA_COLOR } from '@/entities/billing-period/constants/period-result'
import CategoryIcon from '@/entities/category/ui/CategoryIcon'
import { formatDelta } from '@/shared/utils/formatDelta'
import { formatDate } from '@/shared/utils/formatPeriod'
import { formattingMonay } from '@/shared/utils/formattingMonay'
import BaseModalV2 from '@/shared/ui/modal_v2'
import { Button, Heading, HStack, Spinner, Table, Text, VStack } from '@chakra-ui/react'
import { FileText } from 'lucide-react'
import React from 'react'

const getDeltaColor = (delta: string | null) => {
  if (delta === null) return 'label'
  return Number(delta) >= 0 ? PERIOD_DELTA_COLOR.positive : PERIOD_DELTA_COLOR.negative
}

type ContentProps = {
  period: BillingPeriodHistoryItem
}

// Лежит внутри модалки: данные запрашиваются, только когда окно открыто
const PeriodSummaryContent = ({ period }: ContentProps) => {
  const { data, isLoading } = useGetPeriodSummaryQuery(period.id)

  return (
    <>
      <VStack width={'100%'} align={'start'} gap={1} mb={2}>
        <Heading size={'md'}>Итоги цикла</Heading>
        <Text fontSize={'sm'} color={'label'}>
          {formatDate(period.startDate)} — {formatDate(period.endDate)}
        </Text>
      </VStack>

      {isLoading && <Spinner />}

      {data && (
        <>
          <HStack width={'100%'} gap={6}>
            <VStack align={'start'} gap={0}>
              <Text fontSize={'11px'} color={'label'}>План расходов</Text>
              <Text fontWeight={700}>{data.planned ? formattingMonay(data.planned) : '—'}</Text>
            </VStack>
            <VStack align={'start'} gap={0}>
              <Text fontSize={'11px'} color={'label'}>Факт расходов</Text>
              <Text fontWeight={700}>{formattingMonay(data.spent)}</Text>
            </VStack>
            <VStack align={'start'} gap={0}>
              <Text fontSize={'11px'} color={'label'}>Дельта</Text>
              <Text fontWeight={700} color={getDeltaColor(data.delta)}>
                {formatDelta(data.delta)}
              </Text>
            </VStack>
          </HStack>

          <Table.Root size="sm" variant={'primary'} width={'100%'}>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Категория</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">План</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Факт</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Дельта</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.categories.map(category => (
                <Table.Row key={category.categoryId}>
                  <Table.Cell>
                    <HStack gap={2}>
                      <CategoryIcon icon={category.icon} color={category.color}/>
                      <Text fontWeight={600}>{category.name}</Text>
                    </HStack>
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    {category.planned ? formattingMonay(category.planned) : '—'}
                  </Table.Cell>
                  <Table.Cell textAlign="end">{formattingMonay(category.spent)}</Table.Cell>
                  <Table.Cell textAlign="end" color={getDeltaColor(category.delta)}>
                    {formatDelta(category.delta)}
                  </Table.Cell>
                </Table.Row>
              ))}
              {Number(data.uncategorizedSpent) > 0 && (
                <Table.Row>
                  <Table.Cell color={'label'}>Без категории</Table.Cell>
                  <Table.Cell textAlign="end">—</Table.Cell>
                  <Table.Cell textAlign="end">{formattingMonay(data.uncategorizedSpent)}</Table.Cell>
                  <Table.Cell textAlign="end">—</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        </>
      )}
    </>
  )
}

type Props = {
  period: BillingPeriodHistoryItem
}

const PeriodSummaryModal = ({ period }: Props) => {
  return (
    <BaseModalV2
      size='lg'
      trigger={<Button size={'xs'} variant={'plain'}><FileText/> Итоги</Button>}
    >
      <PeriodSummaryContent period={period} />
    </BaseModalV2>
  )
}

export default PeriodSummaryModal
