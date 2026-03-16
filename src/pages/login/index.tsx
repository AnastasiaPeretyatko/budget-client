import { AuthContext } from '@/entities/auth/auth.context';
import { Button, Container, Heading, Input, Link, VStack } from '@chakra-ui/react'
import { useContext, useState } from 'react';

const LoginPage = () => {
  const authState = useContext(AuthContext);

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  return (
    <Container display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} height={'100vh'}>

    <VStack minW={'50%'} gap={6}>
      <Heading size={'2xl'}>Авторизация</Heading>
      <Input placeholder='Email' value={data.email} onChange={e => setData(prev => ({...prev, email: e.target.value}))}/>
      <Input placeholder='Пароль' value={data.password} onChange={e => setData(prev => ({...prev, password: e.target.value}))}/>
      <Link>Забыл пароль?</Link>
      <Button width={'100%'} onClick={() => authState.logIn(data)}>Войти</Button>
    </VStack> 
    </Container>
  )
}

export default LoginPage