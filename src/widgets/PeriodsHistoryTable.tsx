import { BillingPeriodHistoryItem } from '@/entities/billing-period'
import { PERIOD_DELTA_COLOR, PERIOD_RESULT_CONFIG } from '@/entities/billing-period/constants/period-result'
import { formatDelta } from '@/shared/utils/formatDelta'
import { formatDate } from '@/shared/utils/formatPeriod'
import { formattingMonay } from '@/shared/utils/formattingMonay'
import { Box, Card, Heading, HStack, Table, Text } from '@chakra-ui/react'
import React from 'react'
import PeriodSummaryModal from './PeriodSummaryModal'

type Props = {
  history: BillingPeriodHistoryItem[]
}

const PeriodsHistoryTable = ({ history }: Props) => {
  return (
    <Card.Root width={'100%'} variant={'primary'} gap={4}>
      <HStack width={'100%'} justify={'space-between'}>
        <Heading size={'md'}>История закрытых финансовых циклов (Архив периодов)</Heading>
        <Text fontSize={'12px'} color={'label'}>Хранятся за все время ведения учета</Text>
      </HStack>

      {history.length === 0
        ? <Text color={'label'}>Закрытых циклов пока нет</Text>
        : (
          <Table.Root size="sm" variant={'primary'} width={'100%'}>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Интервал цикла</Table.ColumnHeader>
                <Table.ColumnHeader>Статус</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">План расходов</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Факт расходов</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Дельта (итог)</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Документы</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {history.map(item => {
                const result = PERIOD_RESULT_CONFIG[item.result]
                const isProfit = Number(item.delta) >= 0

                return (
                  <Table.Row key={item.id}>
                    <Table.Cell>
                      <Text fontWeight={700}>
                        {formatDate(item.startDate)} — {formatDate(item.endDate)}
                      </Text>
                      {item.daysTotal && <Text fontSize={'11px'} color={'label'}>({item.daysTotal} дн.)</Text>}
                    </Table.Cell>
                    <Table.Cell>
                      <Box
                        display={'inline-block'}
                        px={3}
                        py={1}
                        borderRadius={'full'}
                        fontSize={'11px'}
                        fontWeight={600}
                        bg={result.bg}
                        color={result.color}
                      >
                        {result.label}
                      </Box>
                    </Table.Cell>
                    <Table.Cell textAlign="end">{item.planned ? formattingMonay(item.planned) : '—'}</Table.Cell>
                    <Table.Cell textAlign="end" fontWeight={700}>{formattingMonay(item.spent)}</Table.Cell>
                    <Table.Cell
                      textAlign="end"
                      fontWeight={700}
                      color={isProfit ? PERIOD_DELTA_COLOR.positive : PERIOD_DELTA_COLOR.negative}
                    >
                      {item.delta === null
                        ? <Text color={'label'}>—</Text>
                        : `${formatDelta(item.delta)} (${isProfit ? 'Профицит' : 'Дефицит'})`
                      }
                    </Table.Cell>
                    <Table.Cell textAlign="end">
                      <PeriodSummaryModal period={item} />
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table.Root>
        )
      }
    </Card.Root>
  )
}

export default PeriodsHistoryTable
