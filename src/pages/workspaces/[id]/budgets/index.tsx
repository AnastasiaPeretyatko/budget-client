import Header from '@/features/Header/Header'
import SavingAccountList from '@/widgets/saving-account-list/SavingAccountList'
import Sidebar from '@/widgets/sidebar/Sidebar'
import { Container, Heading, HStack, VStack } from '@chakra-ui/react'
import React from 'react'

const BudgetsPage = () => {
  return (
    <Container width={'100%'} height={'100vh'} display={'flex'} flexDirection={'column'} gap={4} padding={0} margin={0}>
      <Header/>
      <HStack width={'100%'} height={'100%'} padding={0} margin={0}>
        <Sidebar/>
        <VStack width={'100%'} height={'100%'} align={'start'}>
          <Heading>Budgets</Heading>

          <SavingAccountList/>
        </VStack>
      </HStack>
    </Container>
  )
}

export default BudgetsPage
