import InvitePersonBlock from '@/widgets/workspace-settings/InvitePersonBlock'
import { Heading, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/app/store'
import { fetchCurrentWorkspaceThunk } from '@/entities/workspace'
import WorkspaceStartDay from '@/features/workspace-management/ui/WorkspaceStartDay'

const SettingsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  // const { currentWorkspace, isLoading } = useSelector((state: RootState) => state.workspaces)

  useEffect(() => {
    dispatch(fetchCurrentWorkspaceThunk())
  }, [dispatch])

  return (
    <VStack width={'100%'} align={'start'}>
      <Heading size={'2xl'}>Settings</Heading>

      <InvitePersonBlock/>
      <WorkspaceStartDay/>
    </VStack>
  )
}

export default SettingsPage
