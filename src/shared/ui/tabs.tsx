import { HStack, Tabs } from '@chakra-ui/react'
import { PropsWithChildren, ReactNode } from 'react'
import { JSX } from '@emotion/react/jsx-runtime';

type Props = {
  list: {icon?:JSX.Element, value: string; component: ReactNode}[]
  isOnlyIcon?: boolean;
  isBorder?: boolean;
  fitted?: boolean;
} & PropsWithChildren

const BaseTabs = ({ list, isOnlyIcon, children, isBorder, fitted = true }: Props) => {
  return (
    <Tabs.Root
      size={'sm'}
      defaultValue={list[0].value}
      variant="primary"
      width={'100%'}
      lazyMount
      unmountOnExit
    >
      <HStack align={'center'}>
        {children}
        <Tabs.List width={fitted ? '100%' : 'auto'} justifyContent={fitted ? 'space-between' : 'start'} padding={1}>
          {list.map(el => (
            <Tabs.Trigger key={el.value} value={el.value} width={fitted ? '100%' : 'auto'} justifyContent={'center'}>{isOnlyIcon ? el.icon : el.value}</Tabs.Trigger>
          ))}
          <Tabs.Indicator />
        </Tabs.List>
      </HStack>

      {list.map(el => (
        <Tabs.Content key={el.value +'content'} value={el.value}>{el.component}</Tabs.Content>
      ))}
    </Tabs.Root>
  )
}

export default BaseTabs
