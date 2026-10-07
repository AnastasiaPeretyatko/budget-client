import { useAddTemplateMutation } from '@/entities/template/api/templatesApi'
import { BaseTemplateType } from '@/entities/template/types/template.type'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseModalV2 from '@/shared/ui/modal_v2'
import { Button } from '@chakra-ui/react'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { useState } from 'react'
import TemplateForm, { getEmptyTemplateForm } from '../template-form/TemplateForm'

const AddTemplateModal = () => {
  const [addTemplate, { isLoading }] = useAddTemplateMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const [isOpen, setIsOpen] = useBoolean()
  // Селекты категории и тегов хранят выбор у себя внутри, форму одним reset() не очистить.
  // Меняем key после сохранения — форма создаётся заново, уже пустая.
  const [formKey, setFormKey] = useState(0)

  const handleSubmit = async (data: BaseTemplateType) => {
    try {
      await addTemplate(data).unwrap()
      setIsOpen.off()
      setFormKey(key => key + 1)
      showSuccessMessage('Готово')
    } catch (error) {
      showErrorMessage('Ошибка', error)
    }
  }

  return (
    <BaseModalV2
      size='xl'
      trigger={<Button variant={'primary'}>+ Создать шаблон</Button>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <TemplateForm
        key={formKey}
        title='Создать шаблон транзакции'
        description='Сохраните параметры, чтобы быстро создавать повторяющиеся транзакции в будущем.'
        submitLabel='Сохранить шаблон'
        defaultValues={getEmptyTemplateForm()}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onCancel={setIsOpen.off}
      />
    </BaseModalV2>
  )
}

export default AddTemplateModal
