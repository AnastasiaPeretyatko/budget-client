import { RootState } from '@/app/store'
import { COLOR } from '@/shared/config/colors'
import { Text, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const WelcomeHeader = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <VStack width={'100%'} align={'start'} gap={0}>
      <Text>Привет, {user?.firstName} {user?.lastName}! 👋</Text>
      <Text color={COLOR.LABEL} fontSize={'sm'}>Вот что происходит с вашими финансами</Text>
    </VStack>
  )
}

export default WelcomeHeader
