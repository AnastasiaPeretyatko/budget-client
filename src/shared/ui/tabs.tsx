import { HStack, Tabs } from '@chakra-ui/react'
import { PropsWithChildren, ReactNode } from 'react'
import { COLOR } from '../config/colors';
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
      variant="plain"
      width={'100%'}
      lazyMount
      unmountOnExit
      css={{
        "--tabs-indicator-bg": `${COLOR.BORDER}`,
        "--tabs-indicator-shadow": "shadows.xs",
        "--tabs-trigger-radius": "radii.full",
      }}
    >
      <HStack align={'center'}>
        {children}
        <Tabs.List width={fitted ? '100%' : 'auto'} justifyContent={fitted ? 'space-between' : 'start'} padding={1} style={isBorder ? { borderRadius:28, border: `1px solid ${COLOR.BORDER}` }: {}}>
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
