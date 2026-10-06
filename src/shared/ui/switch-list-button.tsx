import { Button, HStack, VStack } from '@chakra-ui/react'
import Label from './label'

type Props<T> = {
  options: {
    value: T,
    label: string
  }[]
  label: string
  selected: T | null
  onChenge: (type: T) => void
}

const SwitchListButton = <T,>({ label, options, selected, onChenge }: Props<T>) => {
  return (
    <VStack width={'100%'} align={'start'}>
      <Label>{label}</Label>

      <HStack width={'100%'} gap={2}>
        {
          options.map(el =>
            <Button
              key={el.label}
              backgroundColor={'input.bg'}
              borderRadius={10}
              padding={4}
              borderWidth={selected === el.value ? 1 : 0}
              borderColor={selected === el.value ? 'primary' : 'bg.default'}
              boxShadow={'md'}
              color={'text.sidebar'}
              onClick={() => onChenge(el.value)}
              size={'sm'}
              fontWeight={600}
              flex={1}
            >
              {el.label}
            </Button>)
        }

      </HStack>
    </VStack>
  )
}

export default SwitchListButton
