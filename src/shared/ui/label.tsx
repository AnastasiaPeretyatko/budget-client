import { Text, TextProps } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren & TextProps

const Label = ({ children, ...props }: Props) => {
  return (
    <Text fontSize={'xs'} textTransform={'uppercase'} color={"label"} fontWeight={700} {...props}>{children}</Text>
  )
}

export default Label
