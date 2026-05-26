import { Box, Flex, Heading, IconButton, Separator, Spacer, Text, VStack } from '@chakra-ui/react'
import React, { createContext, ReactElement, useContext, useState } from 'react'
import SidebarItem from './SidebarItem'
import PiggyBankIcon from '@/shared/icon/PiggyBankIcon'
import { LuLayoutDashboard, LuUser, LuPanelLeftClose, LuPanelLeftOpen } from 'react-icons/lu'
import { ColorModeButton } from '@/shared/ui/color-mode'

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
    title: 'Budgets',
    icon: <PiggyBankIcon size="md" />,
    path: '/budgets',
  },
  {
    title: 'Profile',
    icon: <LuUser />,
    path: '/profile',
  },
]

const SIDEBAR_WIDTH_EXPANDED = '240px'
const SIDEBAR_WIDTH_COLLAPSED = '68px'

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)

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
            <Heading size="sm" textTransform="uppercase" truncate>
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
