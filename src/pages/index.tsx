import SignInModal from '@/widgets/signin/SignInModal'
import { Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'

const Home = () => {
  return (
    <VStack width={'100%'}>
      <HStack width={'100%'} padding={4} boxShadow={'lg'}>
        <HStack flex={1}>
          <Image alt='logo' src={'/logo.png'} width={30}/>
          <Heading>FinFlow</Heading>
        </HStack>
        <SignInModal/>
      </HStack>

      <VStack width={'50%'} textAlign={'center'} my={8} gap={2}>
        <Heading fontSize={'36px'} lineHeight={'normal'}>Управляйте деньгами осознанно.
        Семейный бюджет без стресса и кассовых разрывов</Heading>
        <Text fontSize={'12px'} color={'label'}>Автоматическая синхронизация со счетами и картами, виртуальные целевые конверты,
      прозрачное распределение зарплаты (50/30/20) и совместный доступ для всей семьи.</Text>
      </VStack>
      <Image alt='dashboard' src={'/dashboard.png'} borderRadius={'12px'} boxShadow={'lg'}/>
    </VStack>
  )
}

export default Home
