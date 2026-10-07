import { CategoryFormType, CreateCategoryDto, MacroFundEnum } from '@/entities/category'
import { CATEGORY_COLORS } from '@/entities/category/constants/category-colors'
import { MACRO_FUND_CONFIG } from '@/entities/category/constants/macro-fund'
import { useSelectedPeriod } from '@/entities/bulling-period/api/useSelectedPeriod'
import ColorPicker from '@/shared/ui/color-picker'
import FieldInput from '@/shared/ui/FieldInput'
import IconPicker from '@/shared/ui/icon-picker/IconPicker'
import Label from '@/shared/ui/label'
import { formattingMonay } from '@/shared/utils/formattingMonay'
import { Box, Button, Checkbox, Grid, HStack, Text, VStack } from '@chakra-ui/react'
import { Check } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'

type Props = {
  defaultValues?: CategoryFormType
  onSubmit: (data: CreateCategoryDto) => void
  onCancel: () => void
  isLoading: boolean
  submitText: string
  archiveButton?: React.ReactNode
}

const DEFAULT_VALUES: CategoryFormType = {
  name: '',
  icon: 'Wallet',
  color: CATEGORY_COLORS[0],
  macroFund: MacroFundEnum.ESSENTIALS,
  defaultLimit: '',
  rolloverToReserve: false,
  allowOverspendFromFund: false,
}

const FLAGS = [
  {
    name: 'rolloverToReserve',
    title: 'Автоматически переносить неизрасходованный остаток в Резерв',
    description: 'Сэкономленные рубли в конце цикла отправляются в целевой сейф',
  },
  {
    name: 'allowOverspendFromFund',
    title: 'Разрешить перерасход за счет свободных средств фонда',
    description: 'Покрывать дефицит из общего остатка выбранного макро-фонда',
  },
] as const

const SectionTitle = ({ children }: { children: string }) => (
  <HStack>
    <Box width={'4px'} height={'14px'} borderRadius={'full'} bg={'primary'} />
    <Text fontSize={'12px'} fontWeight={700} color={'#334155'} textTransform={'uppercase'}>{children}</Text>
  </HStack>
)

const CategoryForm = ({
  defaultValues = DEFAULT_VALUES,
  onSubmit,
  onCancel,
  isLoading,
  submitText,
  archiveButton
}: Props) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<CategoryFormType>({
    defaultValues
  })
  const { period } = useSelectedPeriod()

  // У периода с зарплатным днём конца может не быть, тогда длину цикла не показываем
  const periodDays = period?.endDate
    ? moment(period.endDate).diff(period.startDate, 'days') + 1
    : null
  const limit = Number(useWatch({ control, name: 'defaultLimit' }))
  const dailyLimit = periodDays && limit ? Math.round(limit / periodDays) : null

  // Пустой лимит значит "без лимита", для сервера это null
  const handleSave = (data: CategoryFormType) => {
    onSubmit({ ...data, defaultLimit: data.defaultLimit || null })
  }

  return (
    <VStack
      as={'form'}
      width={'100%'}
      align={'start'}
      gap={6}
      onSubmit={handleSubmit(handleSave)}
    >
      <VStack width={'100%'} align={'start'} gap={3}>
        <SectionTitle>Основная информация</SectionTitle>
        <HStack width={'100%'} align={'end'} gap={4}>
          <Box flex={1}>
            <FieldInput
              label='Название категории'
              placeholder='Например, Супермаркет и еда'
              required
              invalid={!!errors.name}
              errorText={errors.name?.message}
              {...register('name', { required: 'Введите название' })}
            />
          </Box>
          <VStack align={'start'}>
            <Label color={'#64748B'}>Иконка и палитра</Label>
            <HStack gap={2}>
              <Controller
                control={control}
                name='icon'
                render={({ field }) => <IconPicker size='sm' value={field.value} onChange={field.onChange} />}
              />
              <Controller
                control={control}
                name='color'
                render={({ field }) => (
                  <ColorPicker
                    colors={CATEGORY_COLORS}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </HStack>
          </VStack>
        </HStack>
      </VStack>

      <VStack width={'100%'} align={'start'} gap={3}>
        <SectionTitle>Принадлежность к макро-фонду (50 / 30 / 20)</SectionTitle>
        <Controller
          control={control}
          name='macroFund'
          render={({ field }) => (
            <Grid width={'100%'} templateColumns={'repeat(3, 1fr)'} gap={3}>
              {Object.values(MacroFundEnum).map(fund => {
                const { label, share, description, icon: Icon } = MACRO_FUND_CONFIG[fund]
                const isSelected = field.value === fund

                return (
                  <VStack
                    key={fund}
                    align={'start'}
                    gap={2}
                    p={3}
                    borderRadius={12}
                    borderWidth={2}
                    borderColor={isSelected ? 'primary' : '#E2E8F0'}
                    bg={isSelected ? '#F0FDF4' : 'transparent'}
                    cursor={'pointer'}
                    onClick={() => field.onChange(fund)}
                  >
                    <HStack width={'100%'} justify={'space-between'}>
                      <Box p={'6px'} bg={'#F1F5F9'} borderRadius={'8px'}><Icon size={16} /></Box>
                      <Box
                        width={'16px'}
                        height={'16px'}
                        borderRadius={'full'}
                        borderWidth={2}
                        borderColor={isSelected ? 'primary' : '#CBD5E1'}
                        bg={isSelected ? 'primary' : 'transparent'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                      >
                        {isSelected && <Check size={10} color={'white'} />}
                      </Box>
                    </HStack>
                    <Text fontSize={'12px'} fontWeight={700}>{share}% {label}</Text>
                    <Text fontSize={'11px'} color={'label'}>{description}</Text>
                  </VStack>
                )
              })}
            </Grid>
          )}
        />
      </VStack>

      <VStack width={'100%'} align={'start'} gap={3}>
        <SectionTitle>Лимит и поведение цикла</SectionTitle>
        <VStack
          width={'100%'}
          align={'start'}
          gap={4}
          p={4}
          bg={'#F8FAFC'}
          borderRadius={12}
          borderWidth={'1px'}
          borderColor={'#E2E8F0'}
        >
          <HStack width={'100%'} justify={'space-between'}>
            <VStack align={'start'} gap={0}>
              <Text fontSize={'12px'} fontWeight={700}>
                Плановый лимит на цикл{periodDays && ` (${periodDays} дн.)`}
              </Text>
              <Text fontSize={'11px'} color={'label'}>Сколько можно потратить по категории за один цикл</Text>
            </VStack>
            <HStack width={'160px'}>
              <FieldInput type='number' min={0} placeholder='0' textAlign={'end'} {...register('defaultLimit')} />
              <Text color={'label'}>₽</Text>
            </HStack>
          </HStack>

          {dailyLimit !== null && (
            <HStack
              width={'100%'}
              justify={'space-between'}
              p={3}
              bg={'white'}
              borderRadius={8}
              borderWidth={'1px'}
              borderColor={'#E2E8F0'}
            >
              <Text fontSize={'12px'} color={'#64748B'}>Расчетный суточный темп сжигания:</Text>
              <Text fontSize={'12px'} fontWeight={700} color={'primary'}>~{formattingMonay(dailyLimit)} / день</Text>
            </HStack>
          )}

          {FLAGS.map(flag => (
            <Controller
              key={flag.name}
              control={control}
              name={flag.name}
              render={({ field }) => (
                <Checkbox.Root
                  checked={field.value}
                  onCheckedChange={e => field.onChange(!!e.checked)}
                  colorPalette={'green'}
                  size={'sm'}
                  alignItems={'start'}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
                  <Checkbox.Label>
                    <Text fontSize={'12px'} fontWeight={700}>{flag.title}</Text>
                    <Text fontSize={'11px'} color={'label'} fontWeight={400}>{flag.description}</Text>
                  </Checkbox.Label>
                </Checkbox.Root>
              )}
            />
          ))}
        </VStack>
      </VStack>

      <HStack width={'100%'} justify={'space-between'}>
        <Box>{archiveButton}</Box>
        <HStack>
          <Button variant={'secondary'} onClick={onCancel}>Отмена</Button>
          <Button variant={'primary'} type='submit' loading={isLoading}>{submitText}</Button>
        </HStack>
      </HStack>
    </VStack>
  )
}

export default CategoryForm
