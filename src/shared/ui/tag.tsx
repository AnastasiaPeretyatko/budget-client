import { Tag } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode | string
} & Tag.RootProps

const BaseTag = ({ children, ...props }: Props) => {
  return (
    <Tag.Root {...props}>
      <Tag.Label>{children}</Tag.Label>
    </Tag.Root>
  )
}

export default BaseTag
