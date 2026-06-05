import { COLOR } from '@/shared/config/colors'
import SavingAccountAmoundCard from '@/entities/saving-account/ui/SavingAccountAmoundCard'
import { archiveSavingAccountThunk } from '@/entities/saving-account'
import { getLatestActivePeriod } from '@/entities/bulling-period/api/bulling-period.service'
import { Box, Button, Card, Grid, GridItem, Heading, HStack, Tabs, Text, VStack } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'
import { MdOutlineAddChart, MdOutlineSettings } from 'react-icons/md'
import { TbHistory } from 'react-icons/tb'
import TransactionsHistoryBlock from './TransactionsHistoryBlock'
import AnalyticsBlock from './AnalyticsBlock'
import { fetchDaysFromStartThunk } from '@/entities/bulling-period'

const TransactionTabs = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { activeSavingAccount } = useSelector((state: RootState) => state.savingAccounts)
  const { daysFromStart } = useSelector((state: RootState) => state.billingPeriod)
  const [totalDays, setTotalDays] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchDaysFromStartThunk())
    getLatestActivePeriod()
      .then(({ data }) => {
        setTotalDays(moment(data.endDate).diff(moment(data.startDate), 'days'))
      })
      .catch(() => {})
  }, [])

  const percent = useMemo(() => {
    if (!totalDays || totalDays <= 0) return 0
    return Math.min(Math.round((daysFromStart / totalDays) * 100), 100)
  }, [daysFromStart, totalDays])

  const handleArchive = async () => {
    if (!activeSavingAccount) return
    await dispatch(archiveSavingAccountThunk(activeSavingAccount.id))
    router.push('/budgets')
  }

  const list = [
    { value: 'history', icon: <TbHistory style={{ fontSize: 18 }}/>, component: <TransactionsHistoryBlock/> },
    { value: 'analis', icon: <MdOutlineAddChart style={{ fontSize: 18 }}/>, component: <AnalyticsBlock/> },
    { value: 'settings', icon: <MdOutlineSettings style={{ fontSize: 18 }}/>, component: (
      <VStack width="100%" align="start" gap={6}>
        <Heading size="md">Настройки</Heading>
        <Card.Root width="100%">
          <Card.Body display="flex" flexDir="column" gap={3}>
            <Text fontWeight={600}>Архивация</Text>
            <Text fontSize="sm" color={COLOR.LABEL}>
              Накопительный счёт будет архивирован и перемещён в неактивные.
            </Text>
            <Button
              colorPalette="red"
              variant="surface"
              size="sm"
              alignSelf="start"
              onClick={handleArchive}
            >
              Архивировать
            </Button>
          </Card.Body>
        </Card.Root>
      </VStack>
    ) },
  ]

  return (
    <Tabs.Root
      size={'sm'}
      defaultValue={list[0].value}
      variant="plain"
      width={'100%'}
      css={{
        "--tabs-indicator-bg": `${COLOR.BORDER}`,
        "--tabs-indicator-shadow": "shadows.xs",
        "--tabs-trigger-radius": "radii.full",
      }}
    >
      <Grid width={'100%'} templateColumns="repeat(3, 1fr)" gap="6" mb={4}>
        <GridItem colSpan={2}>
          <HStack width={'100%'} justify={'space-between'} align={'center'}>
            {children}
            <Tabs.List
              padding={1}
              gap={1}
            >
              {list.map(el => (
                <Tabs.Trigger key={el.value} value={el.value} justifyContent={'center'}>
                  {el.icon}
                </Tabs.Trigger>
              ))}
              <Tabs.Indicator />
            </Tabs.List>
          </HStack>
        </GridItem>
      </Grid>

      <Grid width={'100%'} templateColumns="repeat(3, 1fr)" gap="6">
        <GridItem colSpan={2}>
          {list.map(el => (
            <Tabs.Content key={el.value + 'content'} value={el.value}>{el.component}</Tabs.Content>
          ))}
        </GridItem>
        <GridItem colSpan={1}>
          <VStack width={'100%'} gap={4}>
            <SavingAccountAmoundCard savingAccountAmound={activeSavingAccount!.amount}/>
            <Card.Root width="100%">
              <Card.Body display="flex" flexDir="column" gap={2}>
                <Text color={COLOR.LABEL} fontWeight={500} fontSize="sm">
                  Дней с начала периода
                </Text>
                <VStack width="100%" align="start" gap={1}>
                  <HStack width="100%" justify="space-between">
                    <Text fontWeight={700} fontSize="lg">
                      {daysFromStart}
                    </Text>
                    {totalDays !== null && (
                      <Text fontSize="xs" color={COLOR.LABEL}>
                        из {totalDays}
                      </Text>
                    )}
                  </HStack>
                  <Box width="100%" height="8px" borderRadius="full" bg="gray.800" overflow="hidden">
                    <Box
                      height="100%"
                      width={`${percent}%`}
                      borderRadius="full"
                      bg="blue.500"
                      transition="width 0.4s ease"
                    />
                  </Box>
                </VStack>
              </Card.Body>
            </Card.Root>
          </VStack>
        </GridItem>
      </Grid>
    </Tabs.Root>
  )
}

export default TransactionTabs
