import { Field, Textarea, TextareaProps } from '@chakra-ui/react'
import Label from './label'

type Props = {
  label?: string;
  errorText?: string;
  helperText?: string;
  required?: boolean;
  invalid?: boolean
} & TextareaProps

const BaseTextarea = ({ label, required, invalid, errorText, helperText, ...props }: Props) => {
  return (
    <Field.Root required={required}>
      {label && <Label color={'#64748B'}>
        {label} {required && <Field.RequiredIndicator />}
      </Label>}
      <Textarea
        variant={'primary'}
        borderColor={invalid ? 'red.500' : 'outline'}
        {...props}
      />
      {errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
      {helperText && !errorText && <Field.HelperText>{helperText}</Field.HelperText>}
    </Field.Root>
  )
}

export default BaseTextarea
