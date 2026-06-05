import { Field, Input, InputProps } from '@chakra-ui/react'
import React from 'react'
import { COLOR } from '../config/colors';

type Props = {
  required?: boolean;
  helperText?: string;
  label?: string;
  invalid?: boolean;
  errorText?: string;
  type?: React.HTMLInputTypeAttribute;
} & InputProps

const FieldInput = ({
  required,
  helperText,
  label,
  invalid,
  errorText,
  ...props
}:Props) => {
  return (
    <Field.Root required={required} invalid={invalid}>
      {label && <Field.Label color={COLOR.LABEL}>
        {label} {required && <Field.RequiredIndicator />}
      </Field.Label>}
      <Input
        borderRadius={12}
        borderColor={invalid ? 'red.500' : COLOR.BORDER}
        {...props}
      />
      {errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
      {helperText && !errorText && <Field.HelperText>{helperText}</Field.HelperText>}
    </Field.Root>
  )
}

export default FieldInput
