import PiggyBankIcon from '@/shared/icon/PiggyBankIcon'
import { LuLayoutDashboard, LuReceipt } from 'react-icons/lu'
import { MdCalendarViewMonth, MdOutlineSettings } from 'react-icons/md'
import { TbBusinessplan } from 'react-icons/tb'
import { GoProjectTemplate } from 'react-icons/go'
import { SidebarItemProps } from './Sidebar';
import { Plus } from 'lucide-react'

export const SIDEBAR_LIST: SidebarItemProps[] = [
  {
    title: 'Сегодня',
    icon: <LuLayoutDashboard />,
    path: '/dashboard',
  },
  {
    title: 'Счета',
    icon: <PiggyBankIcon size="md" />,
    path: '/budgets',
  },
  {
    title: 'План',
    icon: <TbBusinessplan/>,
    path: '/plan',
  },
  {
    title: 'Шаблоны',
    icon: <GoProjectTemplate/>,
    path: '/templates'
  },
  {
    title: 'Транзакции',
    icon: <LuReceipt />,
    path: '/transactions',
  },
  {
    title: 'Инструменты',
    icon: <MdCalendarViewMonth/>,
    path: '/view'
  },
  {
    title: 'Настройки',
    icon: <MdOutlineSettings/>,
    path: '/settings'
  },
]

export const MOBILE_SIDEBAR_LIST: SidebarItemProps[] = [
  {
    title: 'Сегодня',
    icon: <LuLayoutDashboard />,
    path: '/dashboard',
  },
  {
    title: 'Счета',
    icon: <PiggyBankIcon size="md" />,
    path: '/budgets',
  },
  {
    title: '',
    icon: <Plus/>,
    path: 'button_add'
  },
  {
    title: 'План',
    icon: <TbBusinessplan/>,
    path: '/plan',
  },
  {
    title: 'Ещё',
    icon: <TbBusinessplan/>,
    path: '/plan',
  },
]
