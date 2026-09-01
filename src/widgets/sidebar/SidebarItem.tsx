import { HStack, Icon, Portal, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { SidebarItemProps, useSidebarContext } from './Sidebar'
import { useRouter } from 'next/router'

const SidebarItem = ({ title, icon, path }: SidebarItemProps) => {
  const router = useRouter()
  const { collapsed } = useSidebarContext()
  const isActive = router.pathname === path || router.pathname.startsWith(path + '/')

  const button = (
    <HStack
      as="button"
      onClick={() => router.push(path)}
      width="100%"
      px={3}
      py={2}
      borderRadius="md"
      justify={collapsed ? 'center' : 'start'}
      gap={3}
      cursor="pointer"
      bg={isActive ? 'colorPalette.subtle' : 'transparent'}
      color={isActive ? 'colorPalette.fg' : 'fg.muted'}
      fontWeight={isActive ? 'semibold' : 'normal'}
      _hover={{ bg: isActive ? 'colorPalette.subtle' : 'bg.subtle' }}
      transition="background 0.15s, color 0.15s"
      // colorPalette="blue"
    >
      <Icon fontSize="lg">{icon}</Icon>
      {!collapsed && <Text fontSize="sm" truncate>{title}</Text>}
    </HStack>
  )

  if (collapsed) {
    return (
      <Tooltip.Root openDelay={200} positioning={{ placement: 'right' }}>
        <Tooltip.Trigger asChild >{button}</Tooltip.Trigger>
        <Portal >
          <Tooltip.Positioner>
            <Tooltip.Content>{title}</Tooltip.Content>
          </Tooltip.Positioner>
        </Portal>
      </Tooltip.Root>
    )
  }

  return button
}

export default SidebarItem
