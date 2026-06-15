import { EmptyState } from '@chakra-ui/react'
import React from 'react'

type Props = {
  icon: React.ReactNode
  title: string
  description: string
}

const EmptyUI = ({ title, description, icon }: Props) => {
  return (
    <EmptyState.Root size="lg">
      <EmptyState.Content gap={2}>
        <EmptyState.Indicator>
          {icon}
        </EmptyState.Indicator>
        <EmptyState.Title >{title}</EmptyState.Title>
        <EmptyState.Description>{description}</EmptyState.Description>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}

export default EmptyUI
