import { WorkspaceListType } from '@/entities/workspace/types/workspace.type'
import WorkspaceCard from '@/entities/workspace/ui/WorkspaceCard'

type Props = {
  workspace: WorkspaceListType
}

const WorkspaceCardWidget = ({ workspace }: Props) => {
  return (
    <WorkspaceCard workspace={workspace}/>
  )
}

export default WorkspaceCardWidget
