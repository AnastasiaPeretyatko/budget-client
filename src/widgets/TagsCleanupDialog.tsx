import { useCleanupTagsMutation } from '@/entities/tag/api/tagsApi'
import { TagWithStatsType } from '@/entities/tag'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseModalV2 from '@/shared/ui/modal_v2'
import { Button, Heading, HStack, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
  tags: TagWithStatsType[]
}

const TagsCleanupDialog = ({ tags }: Props) => {
  const [cleanupTags, { isLoading }] = useCleanupTagsMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const [isOpen, setIsOpen] = useBoolean()

  const unusedCount = tags.filter(tag => tag.transactionCount === 0).length

  const handleCleanup = async () => {
    try {
      const { deletedCount } = await cleanupTags().unwrap()
      setIsOpen.off()
      showSuccessMessage(`Удалено неиспользуемых тегов: ${deletedCount}`)
    } catch {
      showErrorMessage('Ошибка при очистке тегов')
    }
  }

  return (
    <BaseModalV2
      trigger={<Button variant={'secondary'} bg={'#FFF1F2'} color={'#E11D48'}>Очистить неиспользуемые</Button>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <Heading>Очистить неиспользуемые теги</Heading>
      <Text>
        {unusedCount
          ? `Будет удалено тегов: ${unusedCount}. Это теги, которые не привязаны ни к одной транзакции.`
          : 'Неиспользуемых тегов нет.'
        }
      </Text>
      <HStack width={'100%'} justify={'end'}>
        <Button variant={'secondary'} onClick={setIsOpen.off}>Отмена</Button>
        <Button
          variant={'primary'}
          onClick={handleCleanup}
          loading={isLoading}
          disabled={!unusedCount}
        >
          Удалить
        </Button>
      </HStack>
    </BaseModalV2>
  )
}

export default TagsCleanupDialog
