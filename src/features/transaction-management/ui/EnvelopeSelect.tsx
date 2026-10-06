import { useGetEnvelopesQuery } from '@/entities/envelope/api/envelopesApi';
import { createListCollection, Portal, Select, SelectRootProps } from '@chakra-ui/react';
import React, { useMemo } from 'react'

type Props = {
  accountId?: string;
  onChange: (id: string) => void;
  label: string
} & Omit<SelectRootProps, 'collection'>

const EnvelopeSelect = ({ accountId, onChange, label, ...props }: Props) => {
  const { data } = useGetEnvelopesQuery()

  const collection = useMemo(
    () => createListCollection({
      items: (data || []).map(w => ({ label: w.name, value: w.id })),
    }),
    [data],
  )

  return (
    <Select.Root
      variant={'primary'}
      collection={collection}
      value={accountId ? [accountId] : []}
      onValueChange={e => onChange(e.value[0])}
      {...props}
    >
      <Select.HiddenSelect />
      <Select.Label>{label}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Выберите счет"/>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default EnvelopeSelect
