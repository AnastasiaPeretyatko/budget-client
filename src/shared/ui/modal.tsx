import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode | ((close: () => void) => React.ReactNode);
  buttonTrigger?: React.ReactNode;
  onClickSave?: (close: () => void) => void;
  showFooter?: boolean;
  confirmLabel?: string;
  confirmColorPalette?: string;
  isOpen?: boolean
  onClose?: () => void;
  isLoading?: boolean;
}

const BaseModal = ({
  title,
  description,
  children,
  buttonTrigger,
  onClickSave,
  showFooter = true,
  confirmLabel = 'Сохранить',
  confirmColorPalette,
  isOpen = false,
  onClose,
  isLoading = false
}: Props) => {
  const [open, setOpen] = useState(isOpen)

  const close = () => {
    setOpen(false)
    onClose?.()
  }

  const renderedChildren = typeof children === 'function' ? children(close) : children

  const handleSave = () => {
    if (onClickSave) {
      onClickSave(close)
    } else {
      close()
    }
  }

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return (
    <Dialog.Root
      size={'md'}
      placement={'center'}
      open={open}
      onOpenChange={e => {
        setOpen(e.open)}}
    >
      {buttonTrigger &&
        <Dialog.Trigger>
          {buttonTrigger}
        </Dialog.Trigger>
      }
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
                  <Button variant="secondary">Отмена</Button>
                </Dialog.ActionTrigger>
                <Button variant={'primary'} size="sm" colorPalette={confirmColorPalette} onClick={handleSave} loading={isLoading}>{confirmLabel}</Button>
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
