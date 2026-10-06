import BillingPeriodSelect from '@/features/billing-period-select/BillingPeriodSelect'
import UserAvatar from '@/features/user-avatar/UserAvatar'
import { WorkspaceSelect } from '@/features/workspace-select/WorkspaceSelect'
import { Box, Button, HStack, Input } from '@chakra-ui/react'
import { Plus } from 'lucide-react'

const Header = () => {
  // const isPublic = PUBLIC_ROUTES.includes(router.pathname)

  return (
    <HStack width={"100%"} justify={'space-between'} padding={6} divideX={'1px'} gap={4} bg={'bg.body'} paddingInline={'24px'} paddingBlock={'12px'}>
      <HStack flex={1}>
        <WorkspaceSelect/>
        <BillingPeriodSelect/>
        <Input variant={'primary'} placeholder='Поиск...'/>
        <Button size={'xs'} variant={'secondary'}><Plus/> Из шаблона</Button>
        <Button size={'xs'} variant={'primary'}><Plus/> Транзакция</Button>
      </HStack>
      <Box paddingLeft={2}>
        <UserAvatar/>
      </Box>
      {/* {
        isPublic
          ? <Button size={'sm'} variant={'surface'} onClick={() => router.push('/login')}>Войти</Button>
          : <Button size={'sm'} variant={'surface'} onClick={() => router.push('/login')}>Выйти</Button>
      } */}
    </HStack>
  )
}

export default Header
