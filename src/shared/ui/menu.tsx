import { Menu, Portal } from '@chakra-ui/react'
import React from 'react'

type MenuItem = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
  onClick: () => void;
}

type Props = {
  buttonTrigger: React.ReactNode;
  menuItems: MenuItem[]
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
            {menuItems.map((item) => (
              <Menu.Item
                key={item.value}
                value={item.value}
                onClick={item.onClick}
                color={item.color}
                gap={2}
              >
                {item.icon}
                {item.label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default DropdownMenu
