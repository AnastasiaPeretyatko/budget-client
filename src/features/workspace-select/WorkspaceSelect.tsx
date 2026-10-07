
import { useGetWorkspacesQuery } from '@/entities/workspace/api/workspaceApi'
import { Portal, Select, createListCollection } from "@chakra-ui/react"
import { useMemo } from 'react'

export const WorkspaceSelect = () => {
  const { data: workspaces } = useGetWorkspacesQuery()

  const currentWorkspaceId = localStorage.getItem('workspaceId') as string

  const collection = useMemo(
    () => createListCollection({
      items: (workspaces ?? []).map(w => ({ label: w.title, value: w.id })),
    }),
    [workspaces],
  )

  return (
    <Select.Root variant={'primary'} collection={collection} defaultValue={[currentWorkspaceId]}>
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select framework"/>
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
