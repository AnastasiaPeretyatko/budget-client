import { RootState, useAppDispatch } from '@/app/store'
import { setUser } from '@/entities/auth'
import { useUpdateMeMutation } from '@/entities/user/api/userApi'
import FieldInput from '@/shared/ui/FieldInput'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { Button, HStack, VStack } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

const MyDetailsForm = () => {
  const dispatch = useAppDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const [updateMe, { isLoading }] = useUpdateMeMutation()
  const { showSuccessMessage, showErrorMessage } = useNotifications()

  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')

  const hasChanges = useMemo(() => {
    const serverFirst = user?.firstName ?? ''
    const serverLast = user?.lastName ?? ''
    return firstName !== serverFirst || lastName !== serverLast
  }, [firstName, lastName, user])

  const handleSave = async () => {
    try {
      const updated = await updateMe({ firstName, lastName }).unwrap()
      // Обновляем auth.user — из него имя берут хедер и приветствие
      dispatch(setUser(updated))
      showSuccessMessage('Данные сохранены')
    } catch (error) {
      showErrorMessage('Ошибка сохранения', error)
    }
  }

  return (
    <VStack width={'100%'} align={'start'} gap={4} maxW={'480px'}>
      <HStack width={'100%'} gap={4}>
        <FieldInput
          label="Имя"
          placeholder="Введите имя"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <FieldInput
          label="Фамилия"
          placeholder="Введите фамилию"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </HStack>
      <Button size={'sm'} onClick={handleSave} loading={isLoading} disabled={!hasChanges}>
        Сохранить
      </Button>
    </VStack>
  )
}

export default MyDetailsForm
