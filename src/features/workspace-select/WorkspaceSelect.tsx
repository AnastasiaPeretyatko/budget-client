
import { useAppSelector } from '@/app/store'
import { useGetWorkspacesQuery } from '@/entities/workspace/api/workspaceApi'
import { useSwitchWorkspace } from './useSwitchWorkspace'
import { Portal, Select, createListCollection } from "@chakra-ui/react"
import { useMemo } from 'react'

export const WorkspaceSelect = () => {
  const { data: workspaces } = useGetWorkspacesQuery()

  const activeWorkspaceId = useAppSelector(state => state.workspaces.activeWorkspaceId)
  const switchWorkspace = useSwitchWorkspace()

  const collection = useMemo(
    () => createListCollection({
      items: (workspaces ?? []).map(w => ({ label: w.title, value: w.id })),
    }),
    [workspaces],
  )

  const handleChange = (e: { value: string[] }) => {
    const id = e.value[0]
    if (id && id !== activeWorkspaceId) switchWorkspace(id)
  }

  return (
    <Select.Root
      variant={'primary'}
      collection={collection}
      value={activeWorkspaceId ? [activeWorkspaceId] : []}
      onValueChange={handleChange}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Рабочее пространство"/>
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
