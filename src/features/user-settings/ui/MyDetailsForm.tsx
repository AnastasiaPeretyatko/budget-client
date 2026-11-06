import { RootState, useAppDispatch } from '@/app/store'
import { AuthUser, setUser } from '@/entities/auth'
import { useUpdateMeMutation } from '@/entities/user/api/userApi'
import { useNotifications } from '@/shared/hooks/useNotifications'
import FieldInput from '@/shared/ui/FieldInput'
import { Button, Card, Heading, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

const MyDetailsForm = () => {
  const dispatch = useAppDispatch()
  const [updateMe, { isLoading }] = useUpdateMeMutation()
  const { user } = useSelector((state: RootState) => state.auth)
  const { register, watch, handleSubmit } = useForm<AuthUser>({ defaultValues: { ...user } })
  const { showSuccessMessage, showErrorMessage } = useNotifications()

  //TODO не работает
  const hasChanges = useMemo(() => {
    const serverFirst = user?.firstName ?? ''
    const serverLast = user?.lastName ?? ''
    return watch('firstName') !== serverFirst || watch('lastName') !== serverLast
  }, [user?.firstName, user?.lastName, watch])

  const onSubmit: SubmitHandler<AuthUser> = async(data) => {
    try {
      const updated = await updateMe({ firstName: data.firstName || '', lastName: data.lastName || '' }).unwrap()
      // Обновляем auth.user — из него имя берут хедер и приветствие
      dispatch(setUser(updated))
      showSuccessMessage('Данные сохранены')
    } catch (error) {
      showErrorMessage('Ошибка сохранения', error)
    }
  }

  return (
    <VStack width={'100%'} align={'start'} gap={4}>
      <Card.Root as={'form'} onSubmit={handleSubmit(onSubmit)} width={'100%'} variant={'primary'} gap={4}>
        <Heading fontSize={'18px'}>Информация о профиле</Heading>
        <VStack maxW={'400px'}>
          <FieldInput label='Имя' {...register('firstName')}/>
          <FieldInput label='Фамилия' {...register('lastName')}/>
          <FieldInput label='Почта' {...register('email')}/>

        </VStack>
        <Button width={'max-content'} type='submit' variant={'primary'} disabled={hasChanges} loading={isLoading}>Сохранить</Button>
      </Card.Root>
    </VStack>
  )
}

export default MyDetailsForm
