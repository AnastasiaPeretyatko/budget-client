import { useAppDispatch } from '@/app/store'
import { updateCategoryThunk, CategoryType } from '@/entities/category'
import { HStack, Input, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { MdCheck, MdClose } from 'react-icons/md'

type Props = {
  category: CategoryType
  onClose: () => void
}

const EditCategoryRow = ({ category, onClose }: Props) => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState(category.name)
  const [description, setDescription] = useState(category.description || '')

  const handleSave = () => {
    dispatch(updateCategoryThunk({
      id: category.id,
      data: { name, description: description || undefined },
    })).then(() => onClose())
  }

  return (
    <HStack
      padding={3}
      borderRadius={8}
      borderWidth="1px"
      borderColor="blue.500"
      gap={2}
    >
      <Input
        size="sm"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Название"
        flex={1}
      />
      <Input
        size="sm"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Описание"
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
