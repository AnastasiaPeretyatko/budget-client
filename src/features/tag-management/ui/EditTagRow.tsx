import { useAppDispatch } from '@/app/store'
import { updateTagThunk, TagType } from '@/entities/tag'
import { Box, createListCollection, HStack, Input, IconButton, Portal, Select } from '@chakra-ui/react'
import { useState } from 'react'
import { MdCheck, MdClose } from 'react-icons/md'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { TAG_COLOR_PRESETS } from '@/shared/config/colors'

const colorCollection = createListCollection({ items: TAG_COLOR_PRESETS })

type Props = {
  tag: TagType
  onClose: () => void
}

const EditTagRow = ({ tag, onClose }: Props) => {
  const dispatch = useAppDispatch()
  const { showSuccessMessage, showErrorMessage } = useNotifications()
  const [name, setName] = useState(tag.name)
  const [color, setColor] = useState(tag.color)

  const handleSave = () => {
    dispatch(updateTagThunk({ id: tag.id, data: { name, color } }))
      .unwrap()
      .then(() => {
        showSuccessMessage('Тег обновлён')
        onClose()
      })
      .catch(() => showErrorMessage('Ошибка при обновлении тега'))
  }

  return (
    <HStack
      padding={3}
      borderRadius={8}
      borderWidth="1px"
      borderColor="blue.500"
      gap={2}
    >
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
        size="sm"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Название"
        flex={1}
        onKeyDown={e => e.key === 'Enter' && handleSave()}
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

export default EditTagRow
