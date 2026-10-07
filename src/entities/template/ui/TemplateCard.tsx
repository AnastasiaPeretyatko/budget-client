import { Badge, Card, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { TemplateType } from '../types/template.type'
import { CategoryType } from '@/entities/category'
import { TagType } from '@/entities/tag'
import { SavingAccountType } from '@/entities/saving-account'
import IconPicker from '@/shared/ui/icon-picker/IconPicker'
import { ICON_NAMES } from '@/shared/ui/icon-picker'
import { TYPE_CONFIG } from '@/entities/transaction/constants/transaction-type'
import { formatAmount } from '@/shared/ui/SummaryCard'
import Label from '@/shared/ui/label'
import BaseDataList from '@/shared/ui/data-list'

// категории и теги нужны карточке только для показа (название, цвет),
// поэтому в превью формы достаточно неполных объектов
type TemplateCardData = Partial<Omit<TemplateType, 'category' | 'tags' | 'fromAccount' | 'toAccount'>> & {
  fromAccount?: Pick<SavingAccountType, 'name'> | null
  toAccount?: Pick<SavingAccountType, 'name'> | null
  category?: Pick<CategoryType, 'name'> | null
  tags?: Pick<TagType, 'id' | 'name' | 'color'>[]
}

type Props = {
  template: TemplateCardData
} & PropsWithChildren

const TemplateCard = ({ template, children }: Props) => {
  const configType = TYPE_CONFIG[template.type!]

  return (
    <Card.Root width={'100%'} padding={4} flexDir={'column'} gap={2} bg={'bg.body'} border={'unset'} boxShadow={'sm'} borderRadius={8}>
      <VStack width={'100%'} align={'start'} flex={1}>
        <HStack width={'100%'} justify={'space-between'} align={'start'}>
          <HStack width={'100%'} align={'start'} gap={2}>
            <IconPicker value={template.icon || ICON_NAMES[0]} disabled/>
            <VStack width={'100%'} align={'start'} gap={0}>
              <Heading size={'md'}>{template.name}</Heading>
            </VStack>
          </HStack>
          <Badge size={'xs'} fontSize={'11px'} colorPalette={configType.palette}>{configType.label}</Badge>
        </HStack>
        {(template.category?.name || !!template.tags?.length) && (
          <HStack color={'text.sidebar'} flexWrap={'wrap'} gap={1}>
            {template.category?.name && (
              <Text color={'inherit'} fontSize={'xs'}>{template.category.name}</Text>
            )}
            <HStack width={'100%'} align={'start'}>
              {template.tags?.map(tag => (
                <Badge
                  key={tag.id}
                  size={'sm'}
                  borderRadius={'full'}
                  px={2}
                  fontSize={'2xs'}
                  style={{
                    backgroundColor: tag.color + '28',
                    color: tag.color,
                    border: `1px solid ${tag.color}55`,
                  }}
                >
              #{tag.name}
                </Badge>
              ))}
            </HStack>

          </HStack>
        )}
        <VStack width={'100%'} flex={1}>
          <BaseDataList
            style={{ width: '100%', gap: 1, backgroundColor: '#F2F3FF', padding: '8px', borderRadius: '8px' }}
            data={[
              { label: 'Откуда:', value: template.fromAccount?.name || '-' },
              { label: 'Куда:', value: template.toAccount?.name || '-' }
            ]}
          />
        </VStack>
        <HStack width={'100%'} justify={'space-between'} align={'center'}>
          <Label fontSize={'xs'}>Сумма списания</Label>
          <Heading>{formatAmount(+template.amount!)} ₽</Heading>
        </HStack>
      </VStack>
      {children}
    </Card.Root>
  )
}

export default TemplateCard
