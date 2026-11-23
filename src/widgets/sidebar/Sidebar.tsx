import { Box, Flex, Heading, IconButton, Image, VStack } from '@chakra-ui/react'
import { createContext, ReactElement, useContext, useState } from 'react'
import SidebarItem from './SidebarItem'
import { LuPanelLeftClose, LuPanelLeftOpen } from 'react-icons/lu'
import Label from '@/shared/ui/label'
import { useIsMobile } from '@/shared/hooks/useIsMobile'
import { SIDEBAR_LIST } from './value-sidebar'

export type SidebarItemProps = {
  title: string
  icon: ReactElement
  path: string
}

const SidebarContext = createContext({ collapsed: false })
export const useSidebarContext = () => useContext(SidebarContext)

const SIDEBAR_WIDTH_EXPANDED = '250px'
const SIDEBAR_WIDTH_COLLAPSED = '68px'

const Sidebar = () => {
  const isMobile = useIsMobile()

  const [collapsed, setCollapsed] = useState(isMobile || false)

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
          bg={'bg.body'}
        >
          <Flex align="center" justify={collapsed ? 'center' : 'start'} px={2} mb={4} minH="40px" gap={2}>
            <Image src={'/logo.png'} alt='logo' width={38} height={38}/>
            {!collapsed && (
              <VStack align={'start'} gap={0}>
                <Heading>FinFlow</Heading>
                <Label textWrap={'nowrap'} fontSize={'xs'}>Бюджет • Конверты</Label>
              </VStack>
            )}
          </Flex>

          <VStack gap={1} align="stretch" flex={1}>
            {SIDEBAR_LIST.map((item) => (
              <SidebarItem key={item.path} {...item} />
            ))}
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
