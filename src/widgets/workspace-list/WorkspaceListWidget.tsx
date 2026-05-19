import { AppDispatch, RootState } from '@/common/store.config'
import { Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WorkspaceCardWidget from '../workspace-card/WorkspaceCardWidget'
import { getAllWorkspaceThunk } from '@/entities/workspace/api/workspace.thunk'

const WorkspaceListWidget = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { workspaces, isLoading } = useSelector((state: RootState) => state.workspaces)

  useEffect(() => {
    dispatch(getAllWorkspaceThunk())
  }, [dispatch])

  if (!workspaces.length) return <Text>Workspaces not found</Text>

  if (isLoading) return <Text>Loading...</Text>

  if (!workspaces.length) return <Text>Workspaces not found</Text>

  return (
    <VStack gap={4}>
      {
        workspaces.map(workspace => <WorkspaceCardWidget key={workspace.id} workspace={workspace}/>)
      }
    </VStack>
  )
}

export default WorkspaceListWidget
