import { useArchiveCategoriesMutation } from '@/entities/category/api/categoriesApi'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseModalV2 from '@/shared/ui/modal_v2'
import { Button, Heading, HStack, IconButton, Text } from '@chakra-ui/react'
import { Archive } from 'lucide-react'
import { ReactNode } from 'react'

type Props = {
  id: string
  trigger?: ReactNode
}

const CategoryArchiveDialog = ({ id, trigger }: Props) => {
  const [archiveCategory, { isLoading }] = useArchiveCategoriesMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const handleArchive = async() => {
    try {
      await archiveCategory(id)
      showSuccessMessage('Категория успешно заархивирована')
    } catch (error) {
      showErrorMessage(error)
    }
  }

  return (
    <BaseModalV2 trigger={trigger ?? <IconButton size={'xs'} variant={'secondary'}><Archive/></IconButton>}>
      <Heading>Перенести в архив</Heading>
      <Text>Вы действительно хотите заархивировать эту категорию?</Text>
      <HStack width={'100%'} justify={'end'}>
        <Button variant={'secondary'}>Отмена</Button>
        <Button variant={'primary'} onClick={handleArchive} loading={isLoading}>Архивировать</Button>
      </HStack>
    </BaseModalV2>
  )
}

export default CategoryArchiveDialog
