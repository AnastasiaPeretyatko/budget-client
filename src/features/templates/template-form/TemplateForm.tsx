import { BaseTemplateType, TemplateType } from '@/entities/template/types/template.type'
import { Button, Heading, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import IconPicker from '@/shared/ui/icon-picker/IconPicker'
import FieldInput from '@/shared/ui/FieldInput'
import BaseTextarea from '@/shared/ui/textarea'
import { SearchSelectOption } from '@/shared/ui/search-select'
import TemplateCard from '@/entities/template/ui/TemplateCard'
import { CategorySearchSelect } from '@/features/category-management'
import { TagSelectInput, TagSelectOption } from '@/features/tag-management'
import { SavingAccountSearchSelect } from '@/features/saving-account-management'
import { generateTransactionType } from '@/shared/utils/generatetransactionType'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { FaArrowRightLong } from 'react-icons/fa6'

// Тип транзакции в форме не хранится — он вычисляется из выбранных счетов.
// Счета, категорию и теги храним целиком (название + id), а не только id:
// селектам нужно показывать название, а превью — название и цвет.
export type TemplateFormType = Pick<
  BaseTemplateType, 'icon' | 'name' | 'amount' | 'description'
> & {
  fromAccount?: SearchSelectOption
  toAccount?: SearchSelectOption
  category?: SearchSelectOption
  tags: TagSelectOption[]
}

type AccountLike = { id: string, name: string } | null

export const getEmptyTemplateForm = (account?: AccountLike): TemplateFormType => ({
  icon: 'Wallet',
  name: '',
  amount: '',
  description: '',
  tags: [],
  fromAccount: account ? { label: account.name, value: account.id } : undefined,
})

export const templateToForm = (template: TemplateType): TemplateFormType => ({
  icon: template.icon || 'Wallet',
  name: template.name,
  amount: template.amount,
  description: template.description ?? '',
  fromAccount: template.fromAccount
    ? { label: template.fromAccount.name, value: template.fromAccount.id }
    : undefined,
  toAccount: template.toAccount
    ? { label: template.toAccount.name, value: template.toAccount.id }
    : undefined,
  category: template.category
    ? { label: template.category.name, value: template.category.id }
    : undefined,
  tags: (template.tags ?? []).map(tag => ({ label: tag.name, value: tag.id, color: tag.color })),
})

type Props = {
  title: string
  description: string
  submitLabel: string
  defaultValues: TemplateFormType
  isLoading?: boolean
  onSubmit: (data: BaseTemplateType) => void | Promise<void>
  onCancel: () => void
}

const TemplateForm = ({
  title, description, submitLabel, defaultValues, isLoading, onSubmit, onCancel
}: Props) => {
  const {
    register, handleSubmit, control, getValues, setValue, formState: { errors }
  } = useForm<TemplateFormType>({ defaultValues })

  const [icon, name, amount, category, tags, fromAccount, toAccount] = useWatch({
    control,
    name: ['icon', 'name', 'amount', 'category', 'tags', 'fromAccount', 'toAccount']
  })
  const type = generateTransactionType(fromAccount?.value, toAccount?.value)

  const handleSwapAccounts = () => {
    const { fromAccount, toAccount } = getValues()
    setValue('fromAccount', toAccount)
    setValue('toAccount', fromAccount)
  }

  // Пустое значение шлём как null, а не undefined: при редактировании undefined
  // сервер понимает как «не менять», и убранный счёт или категория остались бы старыми.
  const submit = (data: TemplateFormType) => onSubmit({
    icon: data.icon,
    name: data.name,
    amount: data.amount,
    description: data.description || null,
    categoryId: data.category?.value ?? null,
    tagIds: data.tags.map(tag => tag.value),
    fromAccountId: data.fromAccount?.value ?? null,
    toAccountId: data.toAccount?.value ?? null,
    type: generateTransactionType(data.fromAccount?.value, data.toAccount?.value),
  })

  // хотя бы один счёт нужен, иначе непонятно, расход это или доход
  const validateAccounts = () => !!(getValues('fromAccount') || getValues('toAccount')) || 'Выберите хотя бы один счёт'

  return (
    <VStack as={'form'} width={'100%'} align={'stretch'} gap={4} onSubmit={handleSubmit(submit)}>
      <HStack width={'100%'} align={'start'} gap={4} mb={2}>
        <Controller
          control={control}
          name='icon'
          render={({ field }) => <IconPicker value={field.value} onChange={field.onChange} />}
        />
        <VStack width={'100%'} align={'start'} gap={1}>
          <Heading size={'md'}>{title}</Heading>
          <Text fontSize={'sm'} color={'label'}>{description}</Text>
        </VStack>
      </HStack>
      <HStack width={'100%'} align={'stretch'}>
        <VStack width={'60%'} gap={6}>
          <FieldInput
            label='Название шаблона'
            placeholder='Введите название'
            required
            invalid={!!errors.name}
            errorText={errors.name?.message}
            {...register('name', { validate: value => !!value.trim() || 'Введите название' })}
          />
          <HStack width={'100%'} gap={4} align={'start'}>
            <Controller
              control={control}
              name='fromAccount'
              rules={{ validate: validateAccounts }}
              render={({ field }) => (
                <SavingAccountSearchSelect
                  label='Откуда'
                  value={field.value}
                  onChange={(_, option) => field.onChange(option)}
                  invalid={!!errors.fromAccount}
                  errorText={errors.fromAccount?.message}
                />
              )}
            />
            <IconButton aria-label='Поменять местами' variant='ghost' size='sm' onClick={handleSwapAccounts} mt={'26px'}>
              <FaArrowRightLong style={{ minWidth: 20, fontSize: 16 }} />
            </IconButton>
            <Controller
              control={control}
              name='toAccount'
              render={({ field }) => (
                <SavingAccountSearchSelect
                  label='Куда'
                  value={field.value}
                  onChange={(_, option) => field.onChange(option)}
                />
              )}
            />
          </HStack>
          <FieldInput
            label='Сумма'
            placeholder='Введите сумму'
            type='number'
            required
            invalid={!!errors.amount}
            errorText={errors.amount?.message}
            {...register('amount', { required: 'Введите сумму' })}
          />
          <Controller
            control={control}
            name='category'
            render={({ field }) => (
              <CategorySearchSelect
                label='Категория'
                placeholder='Выберите категорию'
                value={field.value}
                onChange={(_, option) => field.onChange(option)}
              />
            )}
          />
          <Controller
            control={control}
            name='tags'
            render={({ field }) => (
              <TagSelectInput
                label='Теги'
                defaultSelected={field.value}
                onChange={(_, selected) => field.onChange(selected)}
              />
            )}
          />
          <BaseTextarea label='Описание' placeholder='Введите описание...' {...register('description')} />
        </VStack>
        <VStack
          width={'40%'}
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
              icon,
              name,
              amount,
              type,
              fromAccount: fromAccount && { name: fromAccount.label },
              toAccount: toAccount && { name: toAccount.label },
              category: category && { name: category.label },
              tags: tags.map(tag => ({ id: tag.value, name: tag.label, color: tag.color })),
            }}
          />
        </VStack>
      </HStack>
      <HStack justify={'end'}>
        <Button size={'sm'} variant={'ghost'} onClick={onCancel}>Отмена</Button>
        <Button size={'sm'} bg={'primary'} type='submit' loading={isLoading}>{submitLabel}</Button>
      </HStack>
    </VStack>
  )
}

export default TemplateForm
