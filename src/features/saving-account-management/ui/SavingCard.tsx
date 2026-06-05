import { SavingAccountType } from '@/entities/saving-account'
import { Card } from '@chakra-ui/react'
import React from 'react'
import SavingCardActions from './SavingCardActions'

type Props = {
  savingAccount: SavingAccountType
}

const SavingCard = ({ savingAccount }: Props) => {
  return (
    <Card.Root width={64} minW={64} height={'100%'}>
      <Card.Body gap={2} padding={4}>
        <Card.Title display={'flex'} justifyContent={'space-between'} alignItems={'center'}>{savingAccount.name} <SavingCardActions id={savingAccount.id}/></Card.Title>
        <Card.Description>{savingAccount.description || '--'}</Card.Description>
        <Card.Footer padding={0}>{savingAccount.amount}₽</Card.Footer>
      </Card.Body>
    </Card.Root>
  )
}

export default SavingCard
