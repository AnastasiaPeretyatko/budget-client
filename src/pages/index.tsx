/* eslint-disable max-len */
import Header from '@/features/Header/Header'
import MoneyComponent from '@/shared/assets/animated/MoneyComponent'
import { Box, Container, HStack, Text } from '@chakra-ui/react'

const Home = () => {
  return (
    <Container width={"100%"} height={'100vh'} padding={4} display={'flex'} flexDir={'column'} alignItems={'center'}>
      <Header />
      <HStack justify={'center'} height={'100%'} >
        <MoneyComponent/>
        <Box width={'30%'}>
          <Text fontSize={'xl'}>
            Отслеживайте расходы, планируйте бюджет и копите на важное — вместе и без лишнего стресса
          </Text>
        </Box>
      </HStack>
    </Container>
  )
}

export default Home
