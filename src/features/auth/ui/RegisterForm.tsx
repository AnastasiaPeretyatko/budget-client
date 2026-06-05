import { AppDispatch, RootState } from '@/app/store'
import { registerThunk } from '@/entities/auth/api/auth.thunk'
import { useNotifications } from '@/shared/hooks/useNotifications'
import FieldInput from '@/shared/ui/FieldInput'
import { Button, chakra, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { showErrorMessage } = useNotifications()
  const router = useRouter()

  const { isLoading } = useSelector((state: RootState) => state.auth)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const credentials = {
      email: data.get('email')?.toString() || '',
      password: data.get('password')?.toString() || '',
    }

    dispatch(registerThunk(credentials))
      .unwrap()
      .then(() => router.push('/workspaces'))
      .catch(() => showErrorMessage('Неправильный логин или пароль'))
  }
  return (
    <chakra.form onSubmit={handleSubmit} autoComplete="on" display="flex" flexDirection="column" gap={4}>
      <FieldInput placeholder='Email' label='Email' name='email' type='email' autoComplete='email'/>
      <FieldInput placeholder='Пароль' label='Password' name='password' type='password' autoComplete='current-password'/>
      <Link width={'100%'} justifyContent={'end'} color={'gray.400'}>Забыл пароль?</Link>
      <Button width={'100%'} type='submit' loading={isLoading}>Войти</Button>
    </chakra.form>
  )
}

export default RegisterForm
