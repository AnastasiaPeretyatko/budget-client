import { COLOR } from '@/shared/config/colors'
import SavingAccountAmoundCard from '@/entities/saving-account/ui/SavingAccountAmoundCard'
import DaysBeforeStartMonthCard from '@/entities/workspace/ui/DaysBeforeStartMonthCard'
import { Grid, GridItem, HStack, Tabs } from '@chakra-ui/react'
import { PropsWithChildren, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/app/store'
import { MdOutlineAddChart, MdOutlineSettings } from 'react-icons/md'
import { TbHistory } from 'react-icons/tb'
import TransactionsHistoryBlock from './TransactionsHistoryBlock'
import AnalyticsBlock from './AnalyticsBlock'
import { fetchDaysFromStartThunk } from '@/entities/bulling-period'

const list = [
  { value: 'history', icon: <TbHistory style={{ fontSize: 18 }}/>, component: <TransactionsHistoryBlock/> },
  { value: 'analis', icon: <MdOutlineAddChart style={{ fontSize: 18 }}/>, component: <AnalyticsBlock/> },
  { value: 'settings', icon: <MdOutlineSettings style={{ fontSize: 18 }}/>, component: <></> },
]

const TransactionTabs = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const { activeSavingAccount } = useSelector((state: RootState) => state.savingAccounts)
  const { daysFromStart } = useSelector((state: RootState) => state.billingPeriod)

  useEffect(() => {
    dispatch(fetchDaysFromStartThunk())
  }, [])

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
          <HStack width={'100%'} gap={4}>
            <SavingAccountAmoundCard savingAccountAmound={activeSavingAccount!.amount}/>
            <DaysBeforeStartMonthCard daysNumber={daysFromStart}/>
          </HStack>
        </GridItem>
      </Grid>
    </Tabs.Root>
  )
}

export default TransactionTabs
