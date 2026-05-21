import Header from '@/features/Header/Header'
import Sidebar from '@/widgets/sidebar/Sidebar'
import { Container, HStack, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

type PrivateLayoutProps = {
  children: ReactNode
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <Container width={'100%'} height={'100vh'} display={'flex'} flexDirection={'column'} gap={4} padding={0} margin={0}>
      <Header />
      <HStack width={'100%'} height={'100%'} padding={0} margin={0}>
        <Sidebar />
        <VStack width={'100%'} height={'100%'} align={'start'}>
          {children}
        </VStack>
      </HStack>
    </Container>
  )
}
