import { Menu, Portal } from '@chakra-ui/react'
import React from 'react'

type Props = {
  buttonTrigger: React.ReactNode;
  menuItems: {
    value: string;
    onClick: () => void;
  }[]
}

const DropdownMenu = ({ menuItems, buttonTrigger }: Props) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        {buttonTrigger}
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {
              menuItems.map((item) => (
                <Menu.Item key={item.value} value={item.value} onClick={item.onClick}>
                  {item.value}
                </Menu.Item>
              ))
            }
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default DropdownMenu
