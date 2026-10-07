import { Box, HStack } from '@chakra-ui/react'
import { Check } from 'lucide-react'

type Props = {
  colors: string[]
  value: string
  onChange: (color: string) => void
}

const ColorPicker = ({ colors, value, onChange }: Props) => {
  return (
    <HStack gap={2}>
      {colors.map(color => (
        <Box
          key={color}
          width={'24px'}
          height={'24px'}
          borderRadius={'full'}
          bg={color}
          cursor={'pointer'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          onClick={() => onChange(color)}
        >
          {value === color && <Check size={12} color={'white'} />}
        </Box>
      ))}
    </HStack>
  )
}

export default ColorPicker
