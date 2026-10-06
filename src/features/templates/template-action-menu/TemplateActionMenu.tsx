import DropdownMenu, { MenuItem } from '@/shared/ui/menu'
import { IconButton } from '@chakra-ui/react'
import { useMemo } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import EditTemplateModal from '../edit-template/EditTemplateModal'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { TemplateType } from '@/entities/template/types/template.type'

type Props = {
  template: TemplateType
}

const TemplateActionMenu = ({ template }: Props) => {
  const [isOpenEditModal, setIsOpenEditModal] = useBoolean()
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useBoolean()

  const item = useMemo<MenuItem[]>(() => {
    return [
      {
        label: 'Редактировать',
        value: 'edit',
        onClick: () => setIsOpenEditModal.on()
      },
      {
        label: 'Удалить',
        value: 'delete',
        onClick: () => setIsOpenDeleteModal.on()
      }
    ]
  },[setIsOpenDeleteModal, setIsOpenEditModal])

  return (
    <>
      <DropdownMenu buttonTrigger={<IconButton variant={'plain'} size={'xs'}><CiMenuKebab/></IconButton>} menuItems={item}/>

      {isOpenEditModal &&
        <EditTemplateModal
          template={template}
          isOpen={isOpenEditModal}
          onClose={setIsOpenEditModal}
        />
      }
    </>
  )
}

export default TemplateActionMenu
