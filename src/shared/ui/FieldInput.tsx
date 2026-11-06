import { Field, HStack, Input, InputGroup, InputProps } from '@chakra-ui/react'
import React, { PropsWithChildren, ReactNode } from 'react'
import Label from './label';

type Props = {
  required?: boolean;
  helperText?: string;
  label?: string;
  invalid?: boolean;
  errorText?: string;
  startElement?: ReactNode;
  endElement?: ReactNode;
  type?: React.HTMLInputTypeAttribute;
} & InputProps & PropsWithChildren

const FieldInput = ({
  required,
  helperText,
  label,
  invalid,
  errorText,
  startElement,
  endElement,
  children,
  ...props
}:Props) => {
  const isInvalid = invalid || !!errorText

  const input = (
    <Input
      variant={'primary'}
      borderRadius={8}
      borderWidth={2}
      borderColor={isInvalid ? 'red.500' : 'outline'}
      {...props}
    />
  )

  return (
    <Field.Root required={required} invalid={isInvalid}>
      <HStack width={'100%'} justify={'space-between'}>
        {label && <Label color={'#64748B'}>
          {label} {required && <Field.RequiredIndicator />}
        </Label>}
        {children}
      </HStack>
      <InputGroup width={'100%'} {...{ startElement, endElement }}>{input}</InputGroup>
      {errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
      {helperText && !errorText && <Field.HelperText>{helperText}</Field.HelperText>}
    </Field.Root>
  )
}

export default FieldInput
