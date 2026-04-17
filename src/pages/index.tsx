import MoneyComponent from '@/shared/assets/animated/MoneyComponent'
import { Box, Button, Container, Heading, HStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  return (
    <Container width={"100%"} height={'100vh'} padding={4} display={'flex'} flexDir={'column'} alignItems={'center'}>
      <HStack width={"100%"} justify={'space-between'}>
        <Heading textTransform={'uppercase'}>Budget home</Heading>
        <Button size={'sm'} variant={'surface'} onClick={() => router.push('/login')}>Login</Button>
      </HStack>
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
