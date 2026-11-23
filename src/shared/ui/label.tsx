import { Text, TextProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren & TextProps

const Label = ({ children, ...props }: Props) => {
  return (
    <Text fontSize={'sm'} color={"text.label"} fontWeight={700} {...props}>{children}</Text>
  )
}

export default Label
