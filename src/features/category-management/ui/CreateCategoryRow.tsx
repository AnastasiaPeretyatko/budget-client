import { useAppDispatch } from '@/app/store'
import { createCategoryThunk } from '@/entities/category'
import { HStack, Input, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import EmojiPickerButton from '@/shared/ui/emoji-picker-button'

type Props = {
  onCreated: () => void
}

const CreateCategoryRow = ({ onCreated }: Props) => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [icon, setIcon] = useState<string | undefined>(undefined)

  const handleCreate = async () => {
    const trimmed = name.trim()
    if (!trimmed) return
    await dispatch(createCategoryThunk({ name: trimmed, icon }))
    setName('')
    setIcon(undefined)
    onCreated()
  }

  return (
    <HStack gap={2}>
      <EmojiPickerButton value={icon} onChange={setIcon} />
      <Input
        placeholder="Название категории"
        value={name}
        onChange={e => setName(e.target.value)}
        size="sm"
        borderRadius={8}
        autoFocus
        onKeyDown={e => e.key === 'Enter' && handleCreate()}
      />
      <IconButton
        aria-label="Создать"
        size="sm"
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
