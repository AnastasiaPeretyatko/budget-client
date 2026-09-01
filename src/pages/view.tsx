import { Button, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { COLOR } from '@/shared/config/colors'
import BaseTabs from '@/shared/ui/tabs'
import GeneralToolView from '@/widgets/tools/GeneralToolView'
import DropdownMenu from '@/shared/ui/menu'

const ViewPage = () => {
  const tabs = [
    {
      value: 'Обзор',
      // icon: <LuUser />,
      component: (
        <VStack width={'100%'} align={'start'} gap={6} pt={4}>
          <GeneralToolView />
        </VStack>
      ),
    },
    // {
    //   value: 'Категории',
    //   // icon: <LuSettings />,
    //   // component: <WorkspaceSettingsTab />,
    // },
    // {
    //   value: 'Теги',
    //   // icon: <LuSettings />,
    //   // component: <WorkspaceSettingsTab />,
    // },
    // {
    //   value: 'Периоды',
    //   // icon: <LuSettings />,
    //   // component: <WorkspaceSettingsTab />,
    // },
  ]

  const menuItems = [
    {
      value: 'Категорию',
      label: 'Категорию',
      onClick: () => console.log('edit')
    },
    {
      value: 'Тег',
      label: 'Тег',
      onClick: () => console.log('edit')
    },
    {
      value: 'Период',
      label: 'Период',
      onClick: () => console.log('edit')
    }
  ]

  return (
    <VStack width="100%" align="start" gap={6}>
      <HStack width={'100%'} justify={'space-between'}>
        <VStack width="100%" justify="space-between" alignItems={'start'}>
          <Heading>Справочники</Heading>
          <Text fontSize={'sm'} color={COLOR.LABEL}>
          Управляйте категориями, тегами и платежами.
          Эти данные используются при создании и фильтрации транзакций
          </Text>
        </VStack>

        <DropdownMenu buttonTrigger={<Button size={'sm'}>+ Добавить</Button>} menuItems={menuItems}/>

      </HStack>
      <BaseTabs list={tabs} isBorder fitted={false} />

      <Grid width="100%" templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
        {/* <Card.Root borderRadius={16} border="none">
          <Card.Body p={5} gap={4} display="flex" flexDir="column">
            <Heading size="md">Категории</Heading>
            <CategoryList />
          </Card.Body>
        </Card.Root> */}

        {/* <Card.Root borderRadius={16} border="none">
          <Card.Body p={5} gap={4} display="flex" flexDir="column">
            <Heading size="md">Платёжные периоды</Heading>
            <BillingPeriodList />
          </Card.Body>
        </Card.Root>

        <Card.Root borderRadius={16} border="none">
          <Card.Body p={5} gap={4} display="flex" flexDir="column">
            <Heading size="md">Теги</Heading>
            <TagList />
          </Card.Body>
        </Card.Root> */}
      </Grid>
    </VStack>
  )
}

export default ViewPage
