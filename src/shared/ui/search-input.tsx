import { CloseButton, Input, InputGroup, InputProps } from '@chakra-ui/react'
import { useRef } from 'react';
import { CiSearch } from 'react-icons/ci';

type Props = InputProps

const SearchInput = ({ ...props }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClear = () => {
    const input = inputRef.current
    if (!input) return

    // Просто input.value = '' React не заметит, и onChange у родителя не сработает (поиск останется старым).
    // Поэтому ставим значение "родным" способом браузера и сами отправляем событие input —
    // тогда родитель получает обычный onChange с пустой строкой.
    const setNativeValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
    setNativeValue?.call(input, '')
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.focus()
  };

  return (
    <InputGroup
      startElement={<CiSearch/>}
      endElement={props.value && <CloseButton
        size={'xs'}
        variant={'plain'}
        onClick={handleClear}
      />}
    >
      <Input ref={inputRef} minW={'100%'} variant={'primary'} {...props}/>
    </InputGroup>
  )
}

export default SearchInput
