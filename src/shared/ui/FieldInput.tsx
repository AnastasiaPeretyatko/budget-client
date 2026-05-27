import { Field, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { COLOR } from '../config/colors';

type Props = {
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  label?: string;
  onChange: (val: string) => void;
  type?: React.HTMLInputTypeAttribute;
}

const FieldInput = ({ required, placeholder, helperText, label, onChange, type }:Props) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    onChange(value)
  }, [onChange, value])

  return (
    <Field.Root required={required}>
      {label && <Field.Label color={COLOR.LABEL}>
        {label} {required && <Field.RequiredIndicator />}
      </Field.Label>}
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        borderRadius={12}
        borderColor={COLOR.BORDER}
      />
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
    </Field.Root>
  )
}

export default FieldInput
