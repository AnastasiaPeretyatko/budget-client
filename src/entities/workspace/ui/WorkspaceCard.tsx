import { Box, Button, Card, HStack, Text } from '@chakra-ui/react'
import { WorkspaceListType } from '../types/workspace.type'
import { IoPeople } from 'react-icons/io5'
import { CiMenuKebab } from 'react-icons/ci'
import { COLOR } from '@/shared/config/colors'
import { MdOutlineCalendarToday, MdOutlinePerson } from 'react-icons/md'
import moment from 'moment'

type Props = {
  workspace: WorkspaceListType
  onSelect?: (id: string) => void
}

const WorkspaceCard = ({ workspace, onSelect }: Props) => {
  return (
    <Card.Root padding={4} onDoubleClick={() => onSelect?.(workspace.id)} display={'flex'} flexDir={'column'} gap={6} height={'max-content'} bgColor={COLOR.BACKGROUND}>
      <Card.Header width={'100%'} display={'flex'} flexDir={'row'} justifyContent={'space-between'} p={0}>
        <Box width={12} height={12} borderRadius={10} backgroundColor={'gray.800'}/>
        <Button size={'xs'} variant={'ghost'}><CiMenuKebab/></Button>
      </Card.Header>
      <Card.Body padding={0} display={'flex'} flexDir={'column'} gap={2}>
        <Card.Title fontSize={'lg'}>{workspace.title}</Card.Title>
        <HStack width={'100%'} color={COLOR.LABEL} fontSize={'xs'} justifyContent={'space-between'}>
          <HStack><MdOutlinePerson/><Text>Владелец</Text></HStack>
          <Text>{workspace.owner.email}</Text>
        </HStack>

        <HStack width={'100%'} color={COLOR.LABEL} fontSize={'xs'} justifyContent={'space-between'}>
          <HStack><IoPeople/><Text>Участники</Text></HStack>
          <Text>{workspace.userCount}</Text>
        </HStack>

        <HStack width={'100%'} color={COLOR.LABEL} fontSize={'xs'} justifyContent={'space-between'}>
          <HStack><MdOutlineCalendarToday/><Text>Создано</Text></HStack>
          <Text>{moment(workspace.createdAt).format('DD.MM.YYYY')}</Text>
        </HStack>
      </Card.Body>

      <Card.Footer width={'100%'} display={'flex'} justifyContent={'space-between'} padding={0}>
        <Button size={'xs'} onClick={() => onSelect?.(workspace.id)}>Открыть</Button>
        <Button size={'xs'} disabled><IoPeople/></Button>
      </Card.Footer>
    </Card.Root>
  )
}

export default WorkspaceCard
