import { Field, HStack, Input, InputProps } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'
import Label from './label';

type Props = {
  required?: boolean;
  helperText?: string;
  label?: string;
  invalid?: boolean;
  errorText?: string;
  type?: React.HTMLInputTypeAttribute;
} & InputProps & PropsWithChildren

const FieldInput = ({
  required,
  helperText,
  label,
  invalid,
  errorText,
  children,
  ...props
}:Props) => {
  return (
    <Field.Root required={required} invalid={invalid}>
      <HStack width={'100%'} justify={'space-between'}>
        {label && <Label color={'#64748B'}>
          {label} {required && <Field.RequiredIndicator />}
        </Label>}
        {children}
      </HStack>

      <Input
        variant={'primary'}
        borderRadius={8}
        borderWidth={2}
        borderColor={invalid ? 'red.500' : 'outline'}
        {...props}
      />
      {errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
      {helperText && !errorText && <Field.HelperText>{helperText}</Field.HelperText>}
    </Field.Root>
  )
}

export default FieldInput
