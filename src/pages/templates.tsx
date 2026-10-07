import AddTemplateModal from '@/features/templates/add-template/AddTemplateModal'
import TemplatePage from '@/widgets/template-page/TemplatePage'
import { Heading, HStack, Text, VStack } from '@chakra-ui/react'

const TemplatesPage = () => {
  return (
    <VStack width={'100%'} align={'start'} gap={8}>
      <HStack width={'100%'} justify={'space-between'} align={'start'}>
        <VStack align={'start'} gap={0}>
          <Heading mb={2}>Шаблон транзакций</Heading>
          <Text fontSize={'sm'} color={'text.sidebar'}>Используйте готовые шаблоны, чтобы быстрее создавать повторяющиеся транзакции.</Text>
          <Text fontSize={'sm'} color={'text.sidebar'}>Вы можете редактировать, удалять и создавать новые шаблоны.</Text>
        </VStack>

        <AddTemplateModal/>
      </HStack>

      {/* <TemplateList/> */}
      <TemplatePage/>
    </VStack>
  )
}

export default TemplatesPage
