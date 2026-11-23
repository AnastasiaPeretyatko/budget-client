import { Checkbox } from '@chakra-ui/react'

type Props = {
  label: string | number
} & Checkbox.RootProps

const CheckboxUI = ({ label, ...props }: Props) => {
  return (
    <Checkbox.Root {...props}>
      <Checkbox.HiddenInput/>
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>{label}</Checkbox.Label>
    </Checkbox.Root>
  )
}

export default CheckboxUI
