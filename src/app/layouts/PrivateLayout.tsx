import { Sidebar } from '@/widgets/sidebar'
import { Flex, Box, VStack } from '@chakra-ui/react'
import moment from 'moment'
import { ReactNode } from 'react'
// Import the specific locale you need
import 'moment/locale/ru'
import { Header } from '@/widgets/header'
import { useIsMobile } from '@/shared/hooks/useIsMobile'
import MobileSidebar from '@/widgets/sidebar/MobileSidebar'
// Set the global locale to Russia
moment.locale('ru')

type PrivateLayoutProps = {
  children: ReactNode
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const isMobile = useIsMobile()

  return (
    <Flex width="100%" height="100dvh" overflow="hidden">
      {!isMobile && <Sidebar />}
      <VStack
        flex="1"
        minWidth={0}
        minHeight={0}
        align="stretch"
        gap={0}
      >
        <Header/>
        <Box
          flex="1"
          minWidth={0}
          minHeight={0}
          width="100%"
          overflow="auto"
          p={4}
          pl={{ base: 4, lg: 8 }}
        >
          {children}
        </Box>
        <MobileSidebar/>
      </VStack>
    </Flex>
  )
}
