import { Popover, Portal } from '@chakra-ui/react'
import { PropsWithChildren, ReactNode } from 'react'

type Props = {
  TriggerButton: ReactNode,
} & PropsWithChildren

const BasePopover = ({ TriggerButton, children }: Props) => {
  return (
    <Popover.Root lazyMount unmountOnExit>
      <Popover.Trigger asChild>
        {TriggerButton}
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              {children}
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}

export default BasePopover
