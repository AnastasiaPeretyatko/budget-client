import { useAddTemplateMutation } from '@/entities/template/api/templatesApi'
import { TransactionTypeEnum } from '@/entities/transaction'
import { useNotifications } from '@/shared/hooks/useNotifications'
import { useState } from 'react'
import BaseModalV2 from '@/shared/ui/modal_v2'
import { Button, Heading, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { IconName } from '@/shared/ui/icon-picker'
import IconPicker from '@/shared/ui/icon-picker/IconPicker'
import FieldInput from '@/shared/ui/FieldInput'
import SwitchListButton from '@/shared/ui/switch-list-button'
import BaseTextarea from '@/shared/ui/textarea'
import TemplateCard from '@/entities/template/ui/TemplateCard'
import { CategorySearchSelect } from '@/features/category-management'
import SavingAccountSearchSelectGroup from '@/features/transaction-management/ui/SavingAccountSearchSelectGroup'
import { TemplateType } from '@/entities/template/types/template.type'
import { FaPen } from 'react-icons/fa6'

type Props = {
  template: TemplateType
}

const EditTemplateModal = ({ template }: Props) => {
  const [addTemplate, { isLoading }] = useAddTemplateMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const [isOpen, setIsOpen] = useBoolean()

  const [name, setName] = useState<string>(template.name || '')
  const [amount, setAmount] = useState<string>(template.amount || '');
  const [icon, setIcon] = useState<IconName>(template.icon || 'Wallet')
  const [selectType, setSelectType] = useState<TransactionTypeEnum>(template.type || TransactionTypeEnum.EXPENSE)
  const [categoryId, setCategoryId] = useState<string | null>(template.categoryId || null)
  const [accounts, setAccounts] = useState<{fromAccountId?: string, toAccountId?: string}>()

  const listOptionType = Object.keys(TransactionTypeEnum).map(t => ({
    label: t,
    value: TransactionTypeEnum[t as keyof typeof TransactionTypeEnum]
  }))

  const handleAddTemplate = async () => {
    if (!amount.trim() && !selectType) return

    try {
      await addTemplate({
        icon,
        name,
        amount,
        ...accounts,
        type: selectType!,
        categoryId: categoryId ?? undefined
      }).unwrap()
      setIsOpen.off()
      showSuccessMessage('success')
    } catch (error) {
      showErrorMessage('error')
    }
  }

  return (
    <BaseModalV2
      size='xl'
      trigger={<IconButton size={'xs'} variant={'plain'}><FaPen/></IconButton>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <HStack width={'100%'} align={'start'} gap={4} mb={2}>
        <IconPicker value={icon} onChange={(val) => setIcon(val)}/>
        <VStack width={'100%'} align={'start'} gap={1}>
          <Heading size={'md'}>Редактировать шаблон транзакции</Heading>
          <Text fontSize={'sm'} color={'label'}>
            Обновите параметры, чтобы быстро создавать повторяющиеся транзакции в будущем.
          </Text>
        </VStack>
      </HStack>
      <HStack width={'100%'} align={'100%'}>
        <VStack width={'60%'} gap={6}>
          <FieldInput
            label='Название шаблона'
            placeholder='Введите название'
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <SwitchListButton
            label='Тип транзакции'
            options={listOptionType}
            selected={selectType}
            onChenge={(type) => setSelectType(type)}
          />
          <SavingAccountSearchSelectGroup type={selectType} onChange={setAccounts}/>
          <FieldInput
            label='Сумма'
            placeholder='Введите сумму'
            type='number'
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <CategorySearchSelect label='Категория' placeholder='Выберите категорию' onChange={(val) => setCategoryId(val)} value={{ label: template.category?.name || '', value: categoryId || '' }}/>
          <BaseTextarea label='Описание' placeholder='Введите описание...' />
        </VStack>
        <VStack
          width={'40%'}
          minH={'100%'}
          align={'start'}
          backgroundColor={'bg.kek'}
          p={4}
          borderRadius={8}
          borderCollapse={'outline'}
          borderWidth={'1px'}
        >
          <Text fontWeight={600}>Как будет выглядеть транзакция:</Text>

          {/* TODO template */}
          <TemplateCard
            template={{
              name,
              amount,
              type: selectType!,
              categoryId: categoryId ?? undefined
            }}
          />
        </VStack>

      </HStack>
      <HStack width={'100%'} justify={'space-between'}>
        <Button size={'sm'} variant={'ghost'} onClick={setIsOpen.off}>Отмена</Button>
        <Button size={'sm'} onClick={handleAddTemplate} loading={isLoading}>Обновить шаблон</Button>
      </HStack>
    </BaseModalV2>
  )
}

export default EditTemplateModal
