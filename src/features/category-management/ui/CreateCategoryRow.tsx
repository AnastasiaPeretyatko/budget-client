import { useAppDispatch } from '@/app/store'
import { createCategoryThunk } from '@/entities/category'
import { HStack, Input, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import EmojiPickerButton from '@/shared/ui/emoji-picker-button'
import { useNotifications } from '@/shared/hooks/useNotifications'

type Props = {
  onCreated: () => void
}

const CreateCategoryRow = ({ onCreated }: Props) => {
  const dispatch = useAppDispatch()
  const { showErrorMessage,showSuccessMessage } = useNotifications()
  const [name, setName] = useState('')
  const [icon, setIcon] = useState<string | undefined>(undefined)

  const handleCreate = async () => {
    const trimmed = name.trim()
    if (!trimmed) return
    await dispatch(createCategoryThunk({ name: trimmed, icon })).unwrap().then(() => {
      showSuccessMessage('Категория успешно создана')
    }).catch((error) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      showErrorMessage(error.message || 'Ошибка при создании категории')
    })
    setName('')
    setIcon(undefined)
    onCreated()
  }

  return (
    <HStack width={'100%'} gap={1}>
      <EmojiPickerButton value={icon} onChange={setIcon} />
      <Input
        placeholder="Название категории"
        value={name}
        onChange={e => setName(e.target.value)}
        size="sm"
        borderRadius={4}
        autoFocus
        onKeyDown={e => e.key === 'Enter' && handleCreate()}
        _focusVisible={{
          outline: 'none'
        }}
      />
      <IconButton
        aria-label="Создать"
        size="sm"
        borderRadius={4}
        variant="solid"
        colorPalette="green"
        disabled={!name.trim()}
        onClick={handleCreate}
      >
        <MdAdd />
      </IconButton>
    </HStack>
  )
}

export default CreateCategoryRow
