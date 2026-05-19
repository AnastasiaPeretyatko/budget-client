"use client"

import { createListCollection, Portal, Select } from "@chakra-ui/react"

type Props = {
  list: {
    label: string;
    value: string
  }[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  maxWidth?: string
}

const SelectComponent = ({ list, onChange, placeholder, value, ...props }: Props) => {
  const frameworks = createListCollection({
    items: list,
  })

  return (
    <Select.Root
      {...props}
      size={'sm'}
      minW={46}
      value={value ? [value] : []}
      collection={frameworks}
      onValueChange={(e) => onChange?.(e.value[0])}
    >
      <Select.HiddenSelect />
      {/* <Select.Label>Select framework</Select.Label> */}
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder || "Select framework"} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.ClearTrigger />
          <Select.Content>
            {frameworks.items.map((framework) => (
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

export default SelectComponent
