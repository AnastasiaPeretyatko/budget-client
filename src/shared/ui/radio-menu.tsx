import { Menu, Portal } from "@chakra-ui/react"
import { ReactNode } from "react"

const ALL_VALUE = '__all__'

type Props<T> = {
  items: {value: T | null, label: string}[];
  triggerButton: ReactNode;
  value: T | null;
  onChange: (val: T | null) => void
}

const RadioMenu = <T extends string>({ items, triggerButton, value, onChange }: Props<T>) => {
  const toInternal = (v: T | null): string => v ?? ALL_VALUE
  const toExternal = (v: string): T | null => (v === ALL_VALUE ? null : (v as T))

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        {triggerButton}
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="10rem">
            <Menu.RadioItemGroup
              value={toInternal(value)}
              onValueChange={(e) => onChange(toExternal(e.value))}
            >
              {items.map((item) => (
                <Menu.RadioItem key={item.value} value={toInternal(item.value)}>
                  {item.label}
                  <Menu.ItemIndicator />
                </Menu.RadioItem>
              ))}
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default RadioMenu
