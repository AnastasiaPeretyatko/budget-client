import InvitePersonBlock from '@/widgets/workspace-settings/InvitePersonBlock'
import { Heading, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAppDispatch } from '@/app/store'
import { fetchCurrentWorkspaceThunk } from '@/entities/workspace'
import WorkspaceStartDay from '@/features/workspace-management/ui/WorkspaceStartDay'
import BaseTabs from '@/shared/ui/tabs'
import MyDetailsForm from '@/features/user-settings/ui/MyDetailsForm'
import { LuSettings, LuUser } from 'react-icons/lu'

const WorkspaceSettingsTab = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCurrentWorkspaceThunk())
  }, [dispatch])

  return (
    <VStack width={'100%'} align={'start'} gap={6} pt={4}>
      <WorkspaceStartDay />
      <InvitePersonBlock />
    </VStack>
  )
}

const SettingsPage = () => {
  const tabs = [
    {
      value: 'Мой профиль',
      icon: <LuUser />,
      component: (
        <VStack width={'100%'} align={'start'} gap={6} pt={4}>
          <MyDetailsForm />
        </VStack>
      ),
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
