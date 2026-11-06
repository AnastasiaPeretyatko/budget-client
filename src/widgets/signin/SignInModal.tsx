import { useAppDispatch } from '@/app/store'
import { loginThunk } from '@/entities/auth'
import { registerThunk } from '@/entities/auth/api/auth.thunk'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { useNotifications } from '@/shared/hooks/useNotifications'
import FieldInput from '@/shared/ui/FieldInput'
import { Button, Dialog, Heading, IconButton, Link, Text } from '@chakra-ui/react'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  email: string;
  password: string;
  repeatPassword?: string;
}

const SignInModal = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { showErrorMessage } = useNotifications()

  const [openPassword, setPassword] = useBoolean(false)
  const [isReg, setIsReg] = useBoolean(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password } = data
    dispatch(isReg ? registerThunk({ email, password }) : loginThunk({ email, password }))
      .unwrap()
      .then(() => router.push('/dashboard'))
      .catch((error) => showErrorMessage('Неправильный логин или пароль', error))
  }

  return (
    <Dialog.Root placement={'center'}>
      <Dialog.Trigger>
        <Button variant={'primary'}>Войти</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content p={8}>
          <Dialog.CloseTrigger />
          <Dialog.Body
            onSubmit={handleSubmit(onSubmit)}
            as={'form'}
            id='signin-form'
            display={'flex'}
            flexDir={'column'}
            alignItems={'end'}
            gap={4}
            p={0}
            mb={6}
          >
            <Heading width={'100%'} textAlign={'center'}>{isReg ? 'Регистрация' : 'Авторизация'}</Heading>
            <FieldInput placeholder='Почта' label='Почта' type='email' autoComplete='email' {...register('email', { required: true })}/>
            <FieldInput
              placeholder='Пароль'
              label='Пароль'
              type={openPassword ? 'text' : 'password'}
              errorText={errors.password?.message}
              autoComplete='current-password'
              {...register('password', { required: 'true' })}
              endElement={<IconButton variant={'unstyle'} onClick={setPassword.toggle}>
                {openPassword ? <EyeClosedIcon/> : <EyeIcon/>}
              </IconButton>
              }
            />
            {
              isReg && <FieldInput
                placeholder='Повторите пароль'
                label='Повторите пароль'
                type={openPassword ? 'text' : 'password'}
                autoComplete='current-password'
                errorText={errors.repeatPassword?.message}
                {...register('repeatPassword', { required: true, validate: (val) => val === watch('password') || 'Пароли не совпадают' })}
                endElement={<IconButton variant={'unstyle'} onClick={setPassword.toggle}>
                  {openPassword ? <EyeClosedIcon/> : <EyeIcon/>}
                </IconButton>
                }
              />
            }
            <Link fontSize={'xs'} color={'label'}>Забыл пароль?</Link>

          </Dialog.Body>
          <Dialog.Footer width={'100%'} flexDir={'column'} p={0}>
            <Button type='submit' form='signin-form' width={'100%'} variant={'primary'}>{isReg ? 'Зарегистрироваться' : 'Войти'}</Button>
            <Link fontSize={'xs'} color={'label'} onClick={setIsReg.toggle}>
              {isReg ? 'Есть аккаунт? ' : 'Еще нет аккаунта?'}
              {isReg ? <Text as={'span'} color={'primary'}>Войти</Text> : <Text as={'span'} color={'primary'}>Зарегистрируйтесь</Text>}
            </Link>

          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

export default SignInModal
