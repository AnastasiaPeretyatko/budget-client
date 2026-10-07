import { useUpdateTemplateMutation } from '@/entities/template/api/templatesApi'
import { BaseTemplateType, TemplateType } from '@/entities/template/types/template.type'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseModalV2 from '@/shared/ui/modal_v2'
import { IconButton } from '@chakra-ui/react'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { useState } from 'react'
import { FaPen } from 'react-icons/fa6'
import TemplateForm, { templateToForm } from '../template-form/TemplateForm'

type Props = {
  template: TemplateType
}

const EditTemplateModal = ({ template }: Props) => {
  const [updateTemplate, { isLoading }] = useUpdateTemplateMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const [isOpen, setIsOpen] = useBoolean()
  // Форма берёт значения шаблона один раз при создании. Меняем key при закрытии,
  // чтобы в следующий раз она открылась с актуальными данными, а не с недописанными правками.
  const [formKey, setFormKey] = useState(0)

  const handleClose = () => {
    setIsOpen.off()
    setFormKey(key => key + 1)
  }

  const handleSubmit = async (data: BaseTemplateType) => {
    try {
      await updateTemplate({ id: template.id, body: data }).unwrap()
      handleClose()
      showSuccessMessage('Готово')
    } catch (error) {
      showErrorMessage('Ошибка', error)
    }
  }

  return (
    <BaseModalV2
      size='xl'
      trigger={<IconButton size={'xs'} variant={'plain'}><FaPen/></IconButton>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <TemplateForm
        key={formKey}
        title='Редактировать шаблон транзакции'
        description='Обновите параметры, чтобы быстро создавать повторяющиеся транзакции в будущем.'
        submitLabel='Обновить шаблон'
        defaultValues={templateToForm(template)}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onCancel={handleClose}
      />
    </BaseModalV2>
  )
}

export default EditTemplateModal
