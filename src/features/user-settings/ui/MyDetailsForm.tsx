import { RootState, useAppDispatch } from '@/app/store'
import { fetchMeThunk, updateMeThunk } from '@/entities/user'
import FieldInput from '@/shared/ui/FieldInput'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { Button, HStack, VStack } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

const MyDetailsForm = () => {
  const dispatch = useAppDispatch()
  const { profile, isLoading } = useSelector((state: RootState) => state.user)
  const { showSuccessMessage, showErrorMessage } = useNotifications()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    dispatch(fetchMeThunk())
  }, [dispatch])

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName ?? '')
      setLastName(profile.lastName ?? '')
    }
  }, [profile])

  const hasChanges = useMemo(() => {
    const serverFirst = profile?.firstName ?? ''
    const serverLast = profile?.lastName ?? ''
    return firstName !== serverFirst || lastName !== serverLast
  }, [firstName, lastName, profile])

  const handleSave = () => {
    dispatch(updateMeThunk({ firstName, lastName }))
      .unwrap()
      .then(() => showSuccessMessage('Данные сохранены'))
      .catch(() => showErrorMessage('Ошибка сохранения'))
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
