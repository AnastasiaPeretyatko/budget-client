import { HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { SidebarItemProps } from './Sidebar'
import { useRouter } from 'next/router'

const SidebarItem = (props: SidebarItemProps) => {
  const router = useRouter()

  const onClick = () => {
    router.push(props.path)
  }

  return (
    <HStack
      as={'button'}
      onClick={onClick}
      width={'100%'}
      padding={2}
      borderRadius={8}
      justify={'start'}
      _hover={{ backgroundColor: 'gray.700' }}
      cursor={'pointer'}
    >
      {props.icon}
      <Text>{props.title}</Text>
    </HStack>
  )
}

export default SidebarItem
