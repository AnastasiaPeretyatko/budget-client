import { useAppDispatch } from '@/app/store'
import { updateCategoryThunk, CategoryType } from '@/entities/category'
import { HStack, Input, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { MdCheck, MdClose } from 'react-icons/md'
import EmojiPickerButton from '@/shared/ui/emoji-picker-button'
import { useNotifications } from '@/shared/hooks/useNotifications'

type Props = {
  category: CategoryType
  onClose: () => void
}

const EditCategoryRow = ({ category, onClose }: Props) => {
  const dispatch = useAppDispatch()
  const { showErrorMessage, showSuccessMessage } = useNotifications()
  const [name, setName] = useState(category.name)
  const [icon, setIcon] = useState<string | undefined>(category.icon)

  const handleSave = () => {
    if (!name.trim()) {
      showErrorMessage('Название категории не может быть пустым')
      return
    }
    if (name === category.name && icon === category.icon) {
      onClose()
      return
    }
    dispatch(updateCategoryThunk({
      id: category.id,
      data: { name, icon },
    })).unwrap()
      .then(() => {
        showSuccessMessage('Категория успешно обновлена')
        onClose()
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        showErrorMessage(error.message || 'Ошибка при обновлении категории')
      })
  }

  return (
    <HStack
      width={'100%'}
      padding={2}
      borderRadius={8}
      gap={2}
    >
      <EmojiPickerButton value={icon} onChange={setIcon} />
      <Input
        size="sm"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Название"
        flex={1}
      />
      <IconButton aria-label="Сохранить" size="xs" variant="ghost" colorPalette="green" onClick={handleSave}>
        <MdCheck />
      </IconButton>
      <IconButton aria-label="Отмена" size="xs" variant="ghost" onClick={onClose}>
        <MdClose />
      </IconButton>
    </HStack>
  )
}

export default EditCategoryRow
