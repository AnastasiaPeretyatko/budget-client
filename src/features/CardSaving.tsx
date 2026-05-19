import { SavingAccountType } from '@/entities/saving-account/types/saving_account.type'
import { Card } from '@chakra-ui/react'
import React from 'react'
import ActionSavingCard from './ActionSavingCard'

type Props = {
  saving: SavingAccountType
}

const CardSaving = ({ saving }: Props) => {
  return (
    <Card.Root width={64} minW={64} height={'100%'}>
      <Card.Body gap={2} padding={4}>
        <Card.Title display={'flex'} justifyContent={'space-between'} alignItems={'center'}>{saving.name} <ActionSavingCard id={saving.id}/></Card.Title>
        <Card.Description>{saving.description || '--'}</Card.Description>
        <Card.Footer padding={0}>{saving.amount}₽</Card.Footer>
      </Card.Body>
    </Card.Root>
  )
}

export default CardSaving
