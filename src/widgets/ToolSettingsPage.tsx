import { Heading, HStack, Text, VStack } from '@chakra-ui/react'
import ToolSettingsTabs from './ToolSettingsTabs'

const ToolSettingsPage = () => {
  return (
    <VStack width={'100%'} align={'start'}>
      <HStack width={'100%'} align={'start'}>
        <VStack width={'100%'} align={'start'}>
          <Heading color={'#0F172A'} fontSize={'24px'}>Центр управления структурой бюджета</Heading>
          <Text fontSize={'12px'} color={'#64748B'}>Конфигурация расходных конвертов, классификатора транзакционных тегов и
                расчетных интервалов синхронизации капитала.</Text>
        </VStack>
        {/* <Button variant={'primary'}>Новая сущность</Button> */}
      </HStack>

      <ToolSettingsTabs/>

    </VStack>
  )
}

export default ToolSettingsPage
