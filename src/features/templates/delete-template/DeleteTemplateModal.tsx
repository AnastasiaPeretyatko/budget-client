import { useDeleteTemplateMutation } from '@/entities/template/api/templatesApi'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseModalV2 from '@/shared/ui/modal_v2'
import { Button, Heading, HStack, IconButton } from '@chakra-ui/react'
import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

type Props = {
  templateId: string
}

const DeleteTemplateModal = ({ templateId }: Props) => {
  const [deleteTemplate, { isLoading }] = useDeleteTemplateMutation()

  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const handleDeleteTemplate = () => {
    try {
      deleteTemplate(templateId)
      showSuccessMessage('Шаблон успешно удален')
    } catch (error) {
      showErrorMessage("Произошла ошибка")
    }
  }

  return (
    <BaseModalV2
      trigger={
        <IconButton size={'xs'} variant={'plain'}><FaRegTrashAlt/></IconButton>}
    >
      <Heading>Вы действитель хотите удалить данный шаблон?</Heading>
      <HStack>
        <Button size={'xs'}>Отменить</Button>
        <Button size={'xs'} colorPalette={'red'} loading={isLoading} onClick={handleDeleteTemplate}>Удалить</Button>
      </HStack>
    </BaseModalV2>
  )
}

export default DeleteTemplateModal
