import { EnvelopesType } from '@/entities/envelope/types/envelopes.type'
import { useUpdateEnvelopeMutation } from '@/entities/envelope/api/envelopApi'
import { useBoolean } from '@/shared/hooks/useBoolean'
import { useNotifications } from '@/shared/hooks/useNotifications'
import BaseModalV2 from '@/shared/ui/modal_v2'
import { Button, Checkbox, Heading, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { SettingsIcon } from 'lucide-react'
import { useState } from 'react'

type Props = {
  envelope: EnvelopesType
}

const SavingSettingsModal = ({ envelope }: Props) => {
  const [updateEnvelope, { isLoading }] = useUpdateEnvelopeMutation()
  const { showErrorMessage, showSuccessMessage } = useNotifications()

  const [isOpen, setIsOpen] = useBoolean()
  const [isSafe, setIsSafe] = useState(envelope.isSafe)

  // Окно закрывается и по крестику, и по клику мимо — поэтому незавершённую
  // правку сбрасываем при каждом открытии, а не при закрытии
  const handleOpenChange = () => {
    if (!isOpen) setIsSafe(envelope.isSafe)
    setIsOpen.toggle()
  }

  const handleSave = async () => {
    try {
      await updateEnvelope({ id: envelope.id, data: { isSafe } }).unwrap()
      setIsOpen.off()
      showSuccessMessage('Настройки конверта сохранены')
    } catch(error) {
      showErrorMessage('Не удалось сохранить настройки конверта', error)
    }
  }

  return (
    <BaseModalV2
      trigger={<IconButton variant={'secondary'} aria-label='Настройки конверта'><SettingsIcon/></IconButton>}
      isOpen={isOpen}
      setIsOpen={{ ...setIsOpen, toggle: handleOpenChange }}
    >
      <VStack width={'100%'} align={'start'} gap={1}>
        <Heading size={'md'}>Настройки конверта</Heading>
        <Text fontSize={'sm'} color={'label'}>{envelope.name}</Text>
      </VStack>

      <Checkbox.Root
        checked={isSafe}
        onCheckedChange={e => setIsSafe(!!e.checked)}
        colorPalette={'green'}
        size={'sm'}
        alignItems={'start'}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
        <Checkbox.Label>
          <Text fontSize={'12px'} fontWeight={700}>Резервный сейф</Text>
          <Text fontSize={'11px'} color={'label'} fontWeight={400}>
            Переводы на этот конверт учитываются на странице «План» как деньги, отложенные в резерв
          </Text>
        </Checkbox.Label>
      </Checkbox.Root>

      <HStack width={'100%'} justify={'end'}>
        <Button variant={'secondary'} onClick={setIsOpen.off}>Отмена</Button>
        <Button variant={'primary'} loading={isLoading} onClick={handleSave}>Сохранить</Button>
      </HStack>
    </BaseModalV2>
  )
}

export default SavingSettingsModal
