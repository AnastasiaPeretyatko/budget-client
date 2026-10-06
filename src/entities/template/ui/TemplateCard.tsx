import { Badge, Card, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { TemplateType } from '../types/template.type'
import IconPicker from '@/shared/ui/icon-picker/IconPicker'
import { ICON_NAMES } from '@/shared/ui/icon-picker'
import { TYPE_CONFIG } from '@/entities/transaction/constants/transaction-type'
import { formatAmount } from '@/shared/ui/SummaryCard'
import Label from '@/shared/ui/label'
import BaseDataList from '@/shared/ui/data-list'

type Props = {
  template: Partial<TemplateType>
} & PropsWithChildren

const TemplateCard = ({ template, children }: Props) => {
  const configType = TYPE_CONFIG[template.type!]

  return (
    <Card.Root width={'100%'} padding={4} flexDir={'column'} gap={2} bg={'bg.body'} border={'unset'} boxShadow={'sm'} borderRadius={8}>
      <HStack width={'100%'} justify={'space-between'} align={'start'}>
        <HStack width={'100%'} align={'start'} gap={2}>
          <IconPicker value={template.icon || ICON_NAMES[0]} disabled/>
          <VStack width={'100%'} align={'start'} gap={0}>
            <Heading size={'md'}>{template.name}</Heading>
          </VStack>
        </HStack>
        <Badge colorPalette={configType.palette}>{configType.label}</Badge>
      </HStack>
      <HStack color={'text.sidebar'}>
        <Text color={'inherit'} fontSize={'xs'}>{template.category?.name}</Text> • <Text color={'inherit'} fontSize={'xs'}>#еда</Text>
      </HStack>
      <VStack>
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
      {children}
    </Card.Root>
  )
}

export default TemplateCard
