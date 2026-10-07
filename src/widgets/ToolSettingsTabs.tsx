import { Tabs } from '@chakra-ui/react'
import { useMemo } from 'react'
import CategoriesSettingsTab from './CategoriesSettingsTab'
import PeriodsSettingsTab from './PeriodsSettingsTab'
import TagsSettingsTab from './TagsSettingsTab'

const ToolSettingsTabs = () => {
  const tabs = useMemo(() => {
    return [
      {
        value: 'categories',
        name: 'Категории и конверты',
        component: <CategoriesSettingsTab/>
      },
      {
        value: 'tags',
        name: 'Теги и аналитические метки',
        component: <TagsSettingsTab/>
      },
      {
        value: 'periods',
        name: 'Расчетные периоды и циклы',
        component: <PeriodsSettingsTab/>
      },
      {
        value: 'rules',
        name: 'Правила автораспределения & MCC',
        component: null,
        disabled: true
      }
    ]
  }, [])

  return (
    <Tabs.Root variant={'primary'} defaultValue={tabs[0].value} width={'100%'}>
      <Tabs.List>
        {
          tabs.map(t => (
            <Tabs.Trigger
              key={t.value}
              value={t.value}
              disabled={t.disabled}
            >{t.name}</Tabs.Trigger>
          ))
        }
        <Tabs.Indicator />
      </Tabs.List>
      {
        tabs.map(t => (
          <Tabs.Content
            key={t.value}
            value={t.value}
          >{t.component}</Tabs.Content>
        ))
      }
    </Tabs.Root>
  )
}

export default ToolSettingsTabs
