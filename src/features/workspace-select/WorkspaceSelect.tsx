
import { RootState, useAppDispatch, useAppSelector } from '@/app/store'
import { fetchWorkspacesThunk } from '@/entities/workspace';
import { Portal, Select, createListCollection } from "@chakra-ui/react"
import { useEffect, useMemo } from 'react'

export const WorkspaceSelect = () => {
  const dispatch = useAppDispatch();
  const { workspaces } = useAppSelector((state: RootState) => state.workspaces);

  const currentWorkspaceId = localStorage.getItem('workspaceId') as string

  const collection = useMemo(
    () => createListCollection({
      items: workspaces.map(w => ({ label: w.title, value: w.id })),
    }),
    [workspaces],
  )

  useEffect(() => {
    dispatch(fetchWorkspacesThunk())
  }, [dispatch])

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
