import { AppDispatch, RootState } from '@/app/store'
import { SimpleGrid, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { WorkspaceCardWidget } from '@/widgets/workspace-card'
import { fetchWorkspacesThunk } from '@/entities/workspace'

const WorkspaceListWidget = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { workspaces, isLoading } = useSelector((state: RootState) => state.workspaces)

  useEffect(() => {
    dispatch(fetchWorkspacesThunk())
  }, [dispatch])

  if (!workspaces.length) return <Text>Workspaces not found</Text>

  if (isLoading) return <Text>Loading...</Text>

  if (!workspaces.length) return <Text>Workspaces not found</Text>

  return (
    <SimpleGrid width={'100%'} height={'100%'} minChildWidth={'300px'} gap={4}>
      {
        workspaces.map(workspace => <WorkspaceCardWidget key={workspace.id} workspace={workspace}/>)
      }
    </SimpleGrid>
  )
}

export default WorkspaceListWidget
