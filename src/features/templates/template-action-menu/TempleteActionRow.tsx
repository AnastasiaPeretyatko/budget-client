import { TemplateType } from '@/entities/template/types/template.type'
import { HStack, IconButton } from '@chakra-ui/react'
import { FaRegCopy } from 'react-icons/fa6'
import DeleteTemplateModal from '../delete-template/DeleteTemplateModal'
import UsedTemplateDrawer from '../used-template/UsedTemplateDrower'
import EditTemplateModal from '../edit-template/EditTemplateModal'

type Props = {
  template: TemplateType
}

const TempleteActionRow = ({ template }: Props) => {
  return (
    <HStack>
      <UsedTemplateDrawer template={template}/>
      <EditTemplateModal template={template}/>
      <IconButton size={'xs'} variant={'plain'}><FaRegCopy/></IconButton>
      <DeleteTemplateModal templateId={template.id}/>

    </HStack>
  )
}

export default TempleteActionRow
