import { AppDispatch } from '@/app/store'
import { WorkspaceListType, setActiveWorkspace, WorkspaceCard } from '@/entities/workspace'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

type Props = {
  workspace: WorkspaceListType
}

const WorkspaceCardWidget = ({ workspace }: Props) => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const handleSelect = (id: string) => {
    localStorage.setItem('workspaceId', id)
    dispatch(setActiveWorkspace(id))
    router.push('/dashboard')
  }

  return (
    <WorkspaceCard workspace={workspace} onSelect={handleSelect}/>
  )
}

export default WorkspaceCardWidget
