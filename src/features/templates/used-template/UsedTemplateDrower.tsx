import { TemplateType } from '@/entities/template/types/template.type'
import { useAddTransactionFromTemplateMutation } from '@/entities/transaction/api/transactionApi'
import { TYPE_CONFIG } from '@/entities/transaction/constants/transaction-type'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseDataList from '@/shared/ui/data-list'
import BaseDrawer from '@/shared/ui/drawer'
import FieldInput from '@/shared/ui/FieldInput'
import IconPicker from '@/shared/ui/icon-picker/IconPicker'
import BaseTextarea from '@/shared/ui/textarea'
import { formattingMonay } from '@/shared/utils/formattingMonay'
import { Badge, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'

type Props = {
  template: TemplateType
}

const UsedTemplateDrawer = ({ template }: Props) => {
  const [amount, setAmount] = useState(template.amount)
  const [addTransaction, { isLoading }] = useAddTransactionFromTemplateMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const configType = TYPE_CONFIG[template.type]

  const dataList = [
    {
      label: 'Сумма',
      value: formattingMonay(template.amount)
    },
    {
      label: 'Тип',
      value: configType.label
    },
    {
      label: 'Категория',
      value: template.category?.name || ''
    },
    {
      label: 'Теги',
      value: ''
    }
  ]

  const handleCreateTransaction = () => {
    try {
      addTransaction({
        templateId: template.id,
        overrides: {
          amount
        }
      })
      showSuccessMessage('Транзакция успешно создалась')
    } catch (error) {
      showErrorMessage('Что-то пошло не так. Проверте данные.')
    }
  }

  return (
    <BaseDrawer
      trigger={<Button
        size={'xs'}
        bg={'primary'}
        flex={1}
      >Использовать</Button>}
    >
      <VStack width={'100%'} align={'start'} flex={1} gap={6}>
        <HStack width={'100%'}>
          <IconPicker value={template.icon} disabled/>
          <VStack width={'100%'} align={'start'} gap={0}>
            <Heading size={'md'}>Шаблон: {template.name}</Heading>
            <Badge colorPalette={configType.palette}>{configType.label}</Badge>
          </VStack>
        </HStack>

        <VStack width={'100%'} align={'start'} gap={2}>
          <Heading size={'sm'}>Как это работает?</Heading>
          <Text color={'text.sidebar'}>
            При нажатии на шаблон создастся новая транзакция с указанными паркаметрами.
            Вы сможете изменить сумму, описание или категорию перед сохранением.</Text>
        </VStack>

        <BaseDataList
          data={dataList}
          style={{
            width:'100%',
            borderRadius: 8,
            padding: 12,
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            gap: 6 }}
        />

        <FieldInput
          label='Сумма'
          placeholder='Введите сумму'
          type='number'
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <BaseTextarea label='Описание' placeholder='Введите описание...' />
      </VStack>
      <Button size={'sm'} bg={'primary'} onClick={handleCreateTransaction} loading={isLoading}>Создать транзакцию</Button>
    </BaseDrawer>
  )
}

export default UsedTemplateDrawer
