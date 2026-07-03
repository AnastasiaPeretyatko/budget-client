import { useAppDispatch } from '@/app/store'
import { createTagThunk } from '@/entities/tag'
import { Box, createListCollection, HStack, Input, IconButton, Portal, Select } from '@chakra-ui/react'
import { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { TAG_COLOR_PRESETS } from '@/shared/config/colors'

const colorCollection = createListCollection({ items: TAG_COLOR_PRESETS })

type Props = {
  onCreated: () => void
}

const CreateTagRow = ({ onCreated }: Props) => {
  const dispatch = useAppDispatch()
  const { showSuccessMessage, showErrorMessage } = useNotifications()
  const [name, setName] = useState('')
  const [color, setColor] = useState(TAG_COLOR_PRESETS[0].value)

  const handleCreate = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    dispatch(createTagThunk({ name: trimmed, color }))
      .unwrap()
      .then(() => {
        showSuccessMessage('Тег создан')
        setName('')
        setColor(TAG_COLOR_PRESETS[0].value)
        onCreated()
      })
      .catch(() => showErrorMessage('Ошибка при создании тега'))
  }

  return (
    <HStack gap={2}>
      <Select.Root
        size="sm"
        collection={colorCollection}
        value={[color]}
        onValueChange={e => setColor(e.value[0])}
        width="130px"
        flexShrink={0}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Box
              width="14px"
              height="14px"
              borderRadius="full"
              flexShrink={0}
              style={{ backgroundColor: color }}
            />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {colorCollection.items.map(item => (
                <Select.Item item={item} key={item.value}>
                  <HStack gap={2}>
                    <Box
                      width="14px"
                      height="14px"
                      borderRadius="full"
                      flexShrink={0}
                      style={{ backgroundColor: item.value }}
                    />
                    {item.label}
                  </HStack>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      <Input
        placeholder="Название тега"
        value={name}
        onChange={e => setName(e.target.value)}
        size="sm"
        borderRadius={8}
        autoFocus
        onKeyDown={e => e.key === 'Enter' && handleCreate()}
        flex={1}
      />
      <IconButton
        aria-label="Создать"
        size="sm"
        variant="solid"
        colorPalette="green"
        disabled={!name.trim()}
        onClick={handleCreate}
        flexShrink={0}
      >
        <MdAdd />
      </IconButton>
    </HStack>
  )
}

export default CreateTagRow
