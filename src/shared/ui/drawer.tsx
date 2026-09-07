import { Button, CloseButton, Drawer, Portal } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { BsCardChecklist } from 'react-icons/bs'

type Props = {
  // trigger: ReactNode
  isFooter?: boolean
} & PropsWithChildren

const BaseDrawer = ({  children, isFooter = false }: Props) => {

  return (
    <Drawer.Root size={'sm'} preventScroll={false}>
      <Drawer.Trigger asChild>
        <Button size={'xs'}><BsCardChecklist/></Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content p={4}>
            {children}
            { isFooter && <Drawer.Footer>
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </Drawer.Footer>}
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" variant={'ghost'}/>
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export default BaseDrawer
