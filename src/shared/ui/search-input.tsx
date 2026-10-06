import { CloseButton, Input, InputGroup, InputProps } from '@chakra-ui/react'
import { useRef } from 'react';
import { CiSearch } from 'react-icons/ci';

type Props = InputProps

const SearchInput = ({ ...props }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = ''; // Очистка поля
      inputRef.current.focus();    // (Опционально) Возвращаем фокус на инпут
    }
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
