import { Box } from '@chakra-ui/react'
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react'
import { useEffect, useRef, useState } from 'react'

type Props = {
  value?: string
  onChange: (emoji: string) => void
  placeholder?: string
}

const EmojiPickerButton = ({ value, onChange, placeholder = '😀' }: Props) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (data: EmojiClickData) => {
    onChange(data.emoji)
    setOpen(false)
  }

  return (
    <Box position="relative" ref={ref}>
      <Box
        asChild
        fontSize="xl"
        minW="36px"
        h="36px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius={8}
        borderWidth="1px"
        borderColor="gray.600"
        cursor="pointer"
        _hover={{ borderColor: 'gray.400' }}
      >
        <button type="button" onClick={() => setOpen(prev => !prev)}>
          {value || placeholder}
        </button>
      </Box>
      {open && (
        <Box position="absolute" top="40px" left={0} zIndex={10}>
          <EmojiPicker theme={Theme.DARK} onEmojiClick={handleSelect} />
        </Box>
      )}
    </Box>
  )
}

export default EmojiPickerButton
