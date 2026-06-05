import LoginForm from '@/features/auth/ui/LoginForm'
import RegisterForm from '@/features/auth/ui/RegisterForm'
import { COLOR } from '@/shared/config/colors'
import BaseTabs from '@/shared/ui/tabs'
import { Container, Flex } from '@chakra-ui/react'
import { useMemo } from 'react'

const LoginPage = () => {
  const tabs = useMemo(() => {
    return [
      {
        value: 'Login',
        component: <LoginForm/>
      },
      {
        value: 'Registration',
        component: <RegisterForm/>
      }
    ]
  }, [])

  return (
    <Flex width={'100vw'} height={'100vh'} justify={'center'} pt={'20%'}>
      <Container maxW={'600px'} height={'max-content'} border={` 1px solid ${COLOR.BORDER}`} padding={6} borderRadius={10}>
        <BaseTabs list={tabs}/>
      </Container>
    </Flex>
  )
}

export default LoginPage
