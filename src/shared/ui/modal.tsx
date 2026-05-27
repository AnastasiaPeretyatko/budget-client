import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import React, { useState } from 'react'

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode | ((close: () => void) => React.ReactNode);
  buttonTrigger: React.ReactNode;
  onClickSave?: (close: () => void) => void;
  showFooter?: boolean;
}

const BaseModal = ({ title, description, children, buttonTrigger, onClickSave, showFooter = true }: Props) => {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  const renderedChildren = typeof children === 'function' ? children(close) : children

  return (
    <Dialog.Root size={'md'} placement={'center'} open={open} onOpenChange={e => setOpen(e.open)}>
      <Dialog.Trigger>
        {buttonTrigger}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body display={'flex'} flexDir={'column'} gap={4}>
              {renderedChildren}
            </Dialog.Body>
            {showFooter && (
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Отмена</Button>
                </Dialog.ActionTrigger>
                <Button size="sm" onClick={() => onClickSave?.(close)}>Сохранить</Button>
              </Dialog.Footer>
            )}
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default BaseModal
