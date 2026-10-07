import { Button, CloseButton, Drawer, Portal } from '@chakra-ui/react'
import { PropsWithChildren, ReactNode } from 'react'
import { BsCardChecklist } from 'react-icons/bs'

type Props = {
  trigger?: ReactNode
  isFooter?: boolean
  // если передать open + onOpenChange, дровером можно управлять снаружи (например, закрыть после отправки формы)
  open?: boolean
  onOpenChange?: (open: boolean) => void
} & PropsWithChildren

const BaseDrawer = ({ trigger, children, isFooter = false, open, onOpenChange }: Props) => {
  return (
    <Drawer.Root
      size={'sm'}
      preventScroll={false}
      open={open}
      onOpenChange={onOpenChange ? e => onOpenChange(e.open) : undefined}
    >
      <Drawer.Trigger asChild>
        {
          trigger ?? <Button size={'xs'}><BsCardChecklist/></Button>
        }
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
