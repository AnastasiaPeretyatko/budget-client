import { Button, Icon, Portal, Text, Tooltip } from '@chakra-ui/react'
import { SidebarItemProps, useSidebarContext } from './Sidebar'
import { useRouter } from 'next/router'

const SidebarItem = ({ title, icon, path }: SidebarItemProps) => {
  const router = useRouter()
  const { collapsed } = useSidebarContext()
  const isActive = router.pathname === path || router.pathname.startsWith(path + '/')

  const button = (
    <Button
      variant={'sidebar'}
      data-current={isActive ? '' : undefined}
      data-collapsed={collapsed ? '' : undefined}
      onClick={() => router.push(path)}
    >
      <Icon fontSize="lg">{icon}</Icon>
      {!collapsed && <Text fontSize="sm" color={'inherit'}>{title}</Text>}
    </Button>
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
