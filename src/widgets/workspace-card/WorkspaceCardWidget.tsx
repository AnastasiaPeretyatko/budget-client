import { WorkspaceListType, WorkspaceCard } from '@/entities/workspace'
import { useSwitchWorkspace } from '@/features/workspace-select/useSwitchWorkspace'

type Props = {
  workspace: WorkspaceListType
}

const WorkspaceCardWidget = ({ workspace }: Props) => {
  const switchWorkspace = useSwitchWorkspace({ redirectTo: '/dashboard' })

  return (
    <WorkspaceCard workspace={workspace} onSelect={switchWorkspace}/>
  )
}

export default WorkspaceCardWidget
