import { AppDispatch, RootState } from '@/common/store.config'
import { loginThunk } from '@/entities/auth/api/auth.thunk'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { Button, Container, Heading, Input, Link, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { showErrorMessage } = useNotifications()
  const router = useRouter()

  const { isLoading } = useSelector((state: RootState) => state.auth)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const dto = {
      email: data.get('email')?.toString() || '',
      password: data.get('password')?.toString() || '',
    }

    dispatch(loginThunk(dto))
      .unwrap()
      .then(() => router.push('/workspaces'))
      .catch(() => showErrorMessage('Неправильный логин или пароль'))
  }

  return (
    <Container display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} height={'100vh'}>

      <form onSubmit={onSubmit} style={{ width: '40%' }} autoComplete="on">
        <VStack width={'100%'} gap={6} backgroundColor={'gray.900'} borderRadius={10} padding={8} border={'1px solid #3f3f46'}>
          <Heading size={'3xl'} mb={4}>Авторизация</Heading>
          <Input placeholder='Email' name='email' type='email' autoComplete='email'/>
          <Input placeholder='Пароль' name='password' type='password' autoComplete='current-password'/>
          <Link width={'100%'} justifyContent={'end'} color={'gray.400'}>Забыл пароль?</Link>
          <Button width={'100%'} type='submit' loading={isLoading}>Войти</Button>
        </VStack>
      </form>
    </Container>
  )
}

export default LoginPage
