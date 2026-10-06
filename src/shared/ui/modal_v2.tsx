import { PropsWithChildren, ReactNode } from 'react';
import { UseBooleanType } from '../hooks/useBoolean';
import { CloseButton, Dialog, Portal } from "@chakra-ui/react"

type Props = {
  isOpen?: boolean;
  setIsOpen?: UseBooleanType;
  trigger?: ReactNode
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "cover" | "full"
} & PropsWithChildren

const BaseModalV2 = ({ isOpen, setIsOpen, trigger, children, size = 'md' }: Props) => {
  return (
    <Dialog.Root
      size={size}
      placement={'center'}
      open={isOpen}
      onOpenChange={() => setIsOpen?.toggle()}
    >
      {trigger &&
        <Dialog.Trigger asChild>
          {trigger}
        </Dialog.Trigger>
      }
      <Portal >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content padding={8} gap={4} background={'bg.body'}>
            {children}
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default BaseModalV2
