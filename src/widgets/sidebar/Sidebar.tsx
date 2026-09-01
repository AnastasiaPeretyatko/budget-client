import { Box, Flex, Heading, IconButton, Separator, Text, VStack } from '@chakra-ui/react'
import { createContext, ReactElement, useContext, useState } from 'react'
import SidebarItem from './SidebarItem'
import SidebarUser from './SidebarUser'
import PiggyBankIcon from '@/shared/icon/PiggyBankIcon'
import { LuLayoutDashboard, LuPanelLeftClose, LuPanelLeftOpen, LuArrowLeftRight, LuReceipt } from 'react-icons/lu'
import { ColorModeButton } from '@/shared/ui/color-mode'
import { MdCalendarViewMonth, MdOutlineAnalytics, MdOutlineSettings } from 'react-icons/md'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/app/store'
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
    title: 'Главная',
    icon: <LuLayoutDashboard />,
    path: '/dashboard',
  },
  {
    title: 'Транзакции',
    icon: <LuReceipt />,
    path: '/transactions',
  },
  {
    title: 'Аналитика',
    icon: <MdOutlineAnalytics/>,
    path: '/analytics'
  },
  {
    title: 'Накопительные',
    icon: <PiggyBankIcon size="md" />,
    path: '/budgets',
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

const SIDEBAR_WIDTH_EXPANDED = '250px'
const SIDEBAR_WIDTH_COLLAPSED = '68px'

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSwitchWorkspace = () => {
    localStorage.removeItem('workspaceId')
    dispatch(clearActiveWorkspace())
    router.push('/workspaces')
  }

  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <Box position="relative" height="100%">
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

          <VStack gap={2} align="stretch" flex={1}>
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
                <Text fontSize="sm" truncate>Переключить пространство</Text>
              )}
            </Flex>
            <SidebarUser />
          </VStack>
        </Flex>
        <IconButton
          aria-label="Toggle sidebar"
          variant="outline"
          size="sm"
          onClick={() => setCollapsed((c) => !c)}
          position="absolute"
          top={5}
          right={0}
          transform="translateX(50%)"
          zIndex={1}
          bg="bg"
          borderRadius="full"
        >
          {collapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />}
        </IconButton>
      </Box>
    </SidebarContext.Provider>
  )
}

export default Sidebar
