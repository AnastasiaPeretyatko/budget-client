import { Flex, Heading, IconButton, Separator, Text, VStack } from '@chakra-ui/react'
import { createContext, ReactElement, useContext, useState } from 'react'
import SidebarItem from './SidebarItem'
import PiggyBankIcon from '@/shared/icon/PiggyBankIcon'
import { LuLayoutDashboard, LuPanelLeftClose, LuPanelLeftOpen, LuLogOut, LuArrowLeftRight } from 'react-icons/lu'
import { ColorModeButton } from '@/shared/ui/color-mode'
import { MdCalendarViewMonth, MdOutlineAnalytics, MdOutlineSettings } from 'react-icons/md'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/app/store'
import { deleteToken, setIsAuth } from '@/entities/auth'
import { clearActiveWorkspace } from '@/entities/workspace'

export type SidebarItemProps = {
  title: string
  icon: ReactElement
  path: string
}

const SidebarContext = createContext({ collapsed: false })
export const useSidebarContext = () => useContext(SidebarContext)

const SIDEBAR_LIST: SidebarItemProps[] = [
  {
    title: 'Dashboard',
    icon: <LuLayoutDashboard />,
    path: '/dashboard',
  },
  {
    title: 'Analytics',
    icon: <MdOutlineAnalytics/>,
    path: '/analytics'
  },
  {
    title: 'Budgets',
    icon: <PiggyBankIcon size="md" />,
    path: '/budgets',
  },
  {
    title: 'View',
    icon: <MdCalendarViewMonth/>,
    path: '/view'
  },
  {
    title: 'Settings',
    icon: <MdOutlineSettings/>,
    path: '/settings'
  },
]

const SIDEBAR_WIDTH_EXPANDED = '240px'
const SIDEBAR_WIDTH_COLLAPSED = '68px'

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    dispatch(deleteToken())
    dispatch(setIsAuth(false))
    router.push('/login')
  }

  const handleSwitchWorkspace = () => {
    localStorage.removeItem('workspaceId')
    dispatch(clearActiveWorkspace())
    router.push('/workspaces')
  }

  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <Flex
        as="aside"
        direction="column"
        width={collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED}
        minW={collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED}
        height="100%"
        borderRight="1px solid"
        borderColor="border"
        py={4}
        px={collapsed ? 2 : 4}
        transition="width 0.2s, min-width 0.2s, padding 0.2s"
        overflow="hidden"
      >
        <Flex align="center" justify={collapsed ? 'center' : 'start'} px={2} mb={4} minH="40px">
          {!collapsed && (
            <Heading size="lg" textTransform="uppercase" truncate>
              Budget
            </Heading>
          )}
        </Flex>

        <VStack gap={1} align="stretch" flex={1}>
          {SIDEBAR_LIST.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </VStack>

        <Separator my={2} />

        <VStack gap={1} align="stretch">
          <Flex justify={collapsed ? 'center' : 'start'} px={collapsed ? 0 : 1}>
            <ColorModeButton />
          </Flex>
          <Flex
            align="center"
            gap={2}
            px={collapsed ? 0 : 1}
            justify={collapsed ? 'center' : 'start'}
            cursor="pointer"
            onClick={handleSwitchWorkspace}
            _hover={{ opacity: 0.8 }}
          >
            <IconButton
              aria-label="Switch workspace"
              variant="ghost"
              size="sm"
              as="span"
            >
              <LuArrowLeftRight />
            </IconButton>
            {!collapsed && (
              <Text fontSize="sm" truncate>Switch workspace</Text>
            )}
          </Flex>
          <Flex justify={collapsed ? 'center' : 'start'} px={collapsed ? 0 : 1}>
            <IconButton
              aria-label="Logout"
              variant="ghost"
              size="sm"
              colorPalette="red"
              onClick={handleLogout}
            >
              <LuLogOut />
            </IconButton>
          </Flex>
          <Flex justify={collapsed ? 'center' : 'start'} px={collapsed ? 0 : 1}>
            <IconButton
              aria-label="Toggle sidebar"
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed((c) => !c)}
            >
              {collapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />}
            </IconButton>
          </Flex>
        </VStack>
      </Flex>
    </SidebarContext.Provider>
  )
}

export default Sidebar
