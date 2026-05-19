import { Card, CardBody, CardTitle, HStack, Text } from '@chakra-ui/react'
import { WorkspaceListType } from '../types/workspace.type'
import moment from 'moment'
import { useRouter } from 'next/router'

type Props = {
  workspace: WorkspaceListType
}

const WorkspaceCard = ({ workspace }: Props) => {
  const router = useRouter()

  const onDoubleClick = () => {
    router.push(`/workspaces/${workspace.id}`)
  }

  return (
    <Card.Root padding={4} onDoubleClick={onDoubleClick}>
      <CardTitle>{workspace.title}</CardTitle>
      <HStack width={'100%'} height={'1px'} background={'gray.500'} marginY={3}/>
      <CardBody padding={0} fontSize={'sm'} color={'gray.400'}>
        <Text>owner: {workspace.owner.email}</Text>
        <Text>count: {workspace.userCount} user</Text>
        <Text>created at: {moment(workspace.createdAt).format('DD.MM.YYYY')}</Text>
      </CardBody>
    </Card.Root>
  )
}

export default WorkspaceCard
