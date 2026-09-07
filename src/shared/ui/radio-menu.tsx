import { Menu, Portal } from "@chakra-ui/react"
import { ReactNode } from "react"

type Props<T> = {
  items: {value: T, label: string}[];
  triggerButton: ReactNode;
  value: T;
  onChange: (val: T) => void
}

const RadioMenu = <T extends string>({ items, triggerButton, value, onChange }: Props<T>) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        {triggerButton}
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="10rem">
            <Menu.RadioItemGroup
              value={value}
              onValueChange={(e) => onChange(e.value as T)}
            >
              {items.map((item) => (
                <Menu.RadioItem key={item.value} value={item.value}>
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
