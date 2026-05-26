import { Sidebar } from '@/widgets/sidebar'
import { Flex, Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

type PrivateLayoutProps = {
  children: ReactNode
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <Flex width="100%" height="100vh">
      <Sidebar />
      <Box flex={1} overflow="auto" p={4}>
        {children}
      </Box>
    </Flex>
  )
}
