import { CategoryType } from '@/entities/category'
import { MACRO_FUND_CONFIG } from '@/entities/category/constants/macro-fund'
import CategoryIcon from '@/entities/category/ui/CategoryIcon'
import { formattingMonay } from '@/shared/utils/formattingMonay'
import { Box, Card, HStack, Table, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import CategoriesEditModal from './CategoriesEditModal'
import CategoryArchiveDialog from './CategoryArchiveDialog'
import CategoryCycleStatus from './CategoryCycleStatus'

type Props = {
  data: CategoryType[]
}

const CatigoriesTable = ({ data }: Props) => {
  return (
    <Card.Root width={'100%'} variant={'primary'}>
      <Table.Root size="sm" variant={'primary'} width={'100%'}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w={'45px'}>#</Table.ColumnHeader>
            <Table.ColumnHeader>Категория/Конверт</Table.ColumnHeader>
            <Table.ColumnHeader>Фонд распределения</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Лимит по умолчанию</Table.ColumnHeader>
            <Table.ColumnHeader w={'260px'}>Статус и факт цикла</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Действия</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item, index) => {
            const fund = item.macroFund ? MACRO_FUND_CONFIG[item.macroFund] : null
            const daysTotal = item.cycle?.daysTotal
            const dailyLimit = item.defaultLimit && daysTotal
              ? Math.round(Number(item.defaultLimit) / daysTotal)
              : null

            return (
              <Table.Row key={item.id}>
                <Table.Cell color={'#94A3B8'}>{index + 1 < 10 ? '0'+(index+1) : index+1}</Table.Cell>
                <Table.Cell>
                  <HStack gap={3}>
                    <CategoryIcon icon={item.icon} color={item.color}/>
                    <VStack align={'start'} gap={0}>
                      <Text fontWeight={700}>{item.name}</Text>
                      <Text fontSize={'11px'} color={'label'}>{item.description}</Text>
                    </VStack>
                  </HStack>
                </Table.Cell>
                <Table.Cell>
                  {fund
                    ? (
                      <Box
                        display={'inline-block'}
                        px={3}
                        py={1}
                        borderRadius={'8px'}
                        fontSize={'11px'}
                        fontWeight={600}
                        bg={fund.bg}
                        color={fund.color}
                      >
                        {fund.share}% {fund.label}
                      </Box>
                    )
                    : <Text color={'label'}>—</Text>
                  }
                </Table.Cell>
                <Table.Cell textAlign={'end'}>
                  {item.defaultLimit
                    ? (
                      <>
                        <Text fontWeight={700}>{formattingMonay(item.defaultLimit)}</Text>
                        {dailyLimit !== null && (
                          <Text fontSize={'11px'} color={'label'}>~{formattingMonay(dailyLimit)} / день</Text>
                        )}
                      </>
                    )
                    : <Text color={'label'}>Без лимита</Text>
                  }
                </Table.Cell>
                <Table.Cell>
                  <CategoryCycleStatus cycle={item.cycle}/>
                </Table.Cell>
                <Table.Cell >
                  <HStack justify={'end'}>
                    <CategoriesEditModal category={item}/>
                    <CategoryArchiveDialog id={item.id}/>
                  </HStack>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </Card.Root>

  )
}

export default CatigoriesTable
