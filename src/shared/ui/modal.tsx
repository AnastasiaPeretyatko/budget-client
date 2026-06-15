import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import React, { useState } from 'react'

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode | ((close: () => void) => React.ReactNode);
  buttonTrigger: React.ReactNode;
  onClickSave?: (close: () => void) => void;
  showFooter?: boolean;
  confirmLabel?: string;
  confirmColorPalette?: string;
}

const BaseModal = ({ title, description, children, buttonTrigger, onClickSave, showFooter = true, confirmLabel = 'Сохранить', confirmColorPalette }: Props) => {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  const renderedChildren = typeof children === 'function' ? children(close) : children

  const handleSave = () => {
    onClickSave?.(close)
    close()
  }

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
                <Button size="sm" colorPalette={confirmColorPalette} onClick={handleSave}>{confirmLabel}</Button>
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
