import { TemplateType } from '@/entities/template/types/template.type'
import TemplateCard from '@/entities/template/ui/TemplateCard'
import TempleteActionRow from '@/features/templates/template-action-menu/TempleteActionRow'
import { Grid } from '@chakra-ui/react'

type Props = {
  templates: TemplateType[]
}

const TemplateList = ({ templates }: Props) => {

  return (
    <Grid templateColumns={'repeat(3, 1fr)'} width={'100%'} gap={6}>
      {templates?.map(t => (
        <TemplateCard key={t.id} template={t}>
          <TempleteActionRow template={t}/>
        </TemplateCard>))
      }
    </Grid>
  )
}

export default TemplateList
