"use client"

import { createListCollection, Portal, Select } from "@chakra-ui/react"

type Props = {
  options: {
    label: string;
    value: string
  }[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  maxWidth?: string
}

const BaseSelect = ({ options, onChange, placeholder, value, ...props }: Props) => {
  const collection = createListCollection({
    items: options,
  })

  return (
    <Select.Root
      {...props}
      size={'sm'}
      minW={46}
      value={value ? [value] : []}
      collection={collection}
      onValueChange={(e) => onChange?.(e.value[0])}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder || "Select option"} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.ClearTrigger />
          <Select.Content>
            {collection.items.map((option) => (
              <Select.Item item={option} key={option.value}>
                {option.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default BaseSelect
