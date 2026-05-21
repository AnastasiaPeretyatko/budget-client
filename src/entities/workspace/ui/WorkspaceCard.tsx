import { Card, CardBody, CardTitle, HStack, Text } from '@chakra-ui/react'
import { WorkspaceListType } from '../types/workspace.type'
import moment from 'moment'

type Props = {
  workspace: WorkspaceListType
  onSelect?: (id: string) => void
}

const WorkspaceCard = ({ workspace, onSelect }: Props) => {
  return (
    <Card.Root padding={4} onDoubleClick={() => onSelect?.(workspace.id)}>
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
