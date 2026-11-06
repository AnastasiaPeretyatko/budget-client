import InvitePersonBlock from '@/widgets/workspace-settings/InvitePersonBlock'
import { Card, Heading, VStack } from '@chakra-ui/react'
import WorkspaceStartDay from '@/features/workspace-management/ui/WorkspaceStartDay'
import BaseTabs from '@/shared/ui/tabs'
import MyDetailsForm from '@/features/user-settings/ui/MyDetailsForm'
import { LuSettings, LuUser } from 'react-icons/lu'

const WorkspaceSettingsTab = () => {
  return (
    <Card.Root width={'100%'} variant={'primary'} gap={4}>
      <WorkspaceStartDay />
      <InvitePersonBlock />
    </Card.Root>
  )
}

const SettingsPage = () => {
  const tabs = [
    {
      value: 'Мой профиль',
      icon: <LuUser />,
      component: <MyDetailsForm />
    },
    {
      value: 'Рабочее пространство',
      icon: <LuSettings />,
      component: <WorkspaceSettingsTab />,
    },
  ]

  return (
    <VStack width={'100%'} align={'start'} gap={6}>
      <Heading size={'2xl'}>Настройки</Heading>
      <BaseTabs list={tabs} isBorder fitted={false} />
    </VStack>
  )
}

export default SettingsPage
