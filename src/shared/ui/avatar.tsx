import { Avatar } from '@chakra-ui/react'
import React from 'react'

type Props = {
  name?: string;
  imgSrc?: string;
  size?: "xs"| "sm"| "md"| "lg"| "xl"| "2xl"
}

const BaseAvatar = ({ name, imgSrc, size = 'md' }: Props) => {
  return (
    <Avatar.Root size={size}>
      <Avatar.Fallback name={name} />
      {imgSrc && <Avatar.Image src={imgSrc} />}
    </Avatar.Root>
  )
}

export default BaseAvatar
