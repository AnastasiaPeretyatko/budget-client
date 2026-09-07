import { Menu, Portal } from "@chakra-ui/react"
import { ReactNode } from "react"

type Props = {
  items: {value: string, label: string}[];
  triggerButton: ReactNode;
  value: string;
  onChange: (val: string) => void
}

const RadioMenu = ({ items, triggerButton, value, onChange }: Props) => {
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
              onValueChange={(e) => onChange(e.value)}
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
