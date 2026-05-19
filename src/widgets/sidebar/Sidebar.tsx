import { VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import SidebarItem from './SidebarItem'
import PiggyBankIcon from '@/shared/icon/PiggyBankIcon'

export type SidebarItemProps = {
  title: string
  icon: ReactNode | null
  path: string
}

const SIDEBAR_LIST: SidebarItemProps[] = [
  {
    title: 'Dashboard',
    icon: null,
    path: '/'
  },
  {
    title: 'Budgets',
    icon: <PiggyBankIcon size={'md'}/>,
    path: '/budgets'
  }
]

const Sidebar = () => {
  return (
    <VStack width={'20%'} padding={6} alignItems={'start'} borderRight={'1px solid gray'} height={'100%'}>
      {
        SIDEBAR_LIST.map((item) => <SidebarItem key={item.title} {...item}/>)
      }
    </VStack>
  )
}

export default Sidebar
