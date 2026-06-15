import { AppDispatch, RootState } from '@/app/store'
import { SimpleGrid, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { WorkspaceCardWidget } from '@/widgets/workspace-card'
import { fetchWorkspacesThunk } from '@/entities/workspace'
import EmptyUI from '@/shared/ui/empty'
import { MdOutlineWorkspaces } from 'react-icons/md'

const WorkspaceListWidget = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { workspaces, isLoading } = useSelector((state: RootState) => state.workspaces)

  useEffect(() => {
    dispatch(fetchWorkspacesThunk())
  }, [dispatch])

  if (isLoading) return <Text>Loading...</Text>

  if (!workspaces.length) return <EmptyUI icon={<MdOutlineWorkspaces/>} title={'No workspaces'} description={'You have not created any workspaces yet'}/>

  return (
    <SimpleGrid width={'100%'} height={'100%'} columns={[1, 2, 3, 4]} gap={4}>
      {
        workspaces.map(workspace => <WorkspaceCardWidget key={workspace.id} workspace={workspace}/>)
      }
    </SimpleGrid>
  )
}

export default WorkspaceListWidget
