import { Sidebar } from '@/widgets/sidebar'
import { Flex, Box, VStack } from '@chakra-ui/react'
import moment from 'moment'
import { ReactNode } from 'react'
// Import the specific locale you need
import 'moment/locale/ru'
import { Header } from '@/widgets/header'
// Set the global locale to Russia
moment.locale('ru')

type PrivateLayoutProps = {
  children: ReactNode
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {

  return (
    <Flex width="100%" height="100vh">
      <Sidebar />
      <VStack width={'100%'}>
        <Header/>
        <Box flex={1} width={'100%'} overflow="auto" p={4} pl={8}>
          {children}
        </Box>
      </VStack>
    </Flex>
  )
}
