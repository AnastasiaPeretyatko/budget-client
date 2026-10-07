import { useDeleteTagMutation } from '@/entities/tag/api/tagsApi'
import { TagWithStatsType } from '@/entities/tag'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseModalV2 from '@/shared/ui/modal_v2'
import { Button, Heading, HStack, IconButton, Text } from '@chakra-ui/react'
import { Trash2 } from 'lucide-react'
import React from 'react'

type Props = {
  tag: TagWithStatsType
}

const TagDeleteDialog = ({ tag }: Props) => {
  const [deleteTag, { isLoading }] = useDeleteTagMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const [isOpen, setIsOpen] = useBoolean()

  const handleDelete = async () => {
    try {
      await deleteTag(tag.id).unwrap()
      setIsOpen.off()
      showSuccessMessage('Тег успешно удалён')
    } catch (error) {
      showErrorMessage('Ошибка при удалении тега', error)
    }
  }

  return (
    <BaseModalV2
      trigger={<IconButton size={'xs'} variant={'plain'}><Trash2/></IconButton>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <Heading>Удалить тег</Heading>
      <Text>
        Вы действительно хотите удалить тег #{tag.name}?
        {tag.transactionCount > 0 && ` Он используется в транзакциях: ${tag.transactionCount}.`}
      </Text>
      <HStack width={'100%'} justify={'end'}>
        <Button variant={'secondary'} onClick={setIsOpen.off}>Отмена</Button>
        <Button variant={'primary'} onClick={handleDelete} loading={isLoading}>Удалить</Button>
      </HStack>
    </BaseModalV2>
  )
}

export default TagDeleteDialog
