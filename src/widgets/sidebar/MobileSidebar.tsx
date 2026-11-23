import { Flex, Grid, Icon, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { MOBILE_SIDEBAR_LIST } from './value-sidebar'
import { useRouter } from 'next/router'
import { useIsMobile } from '@/shared/hooks/useIsMobile'
import { AddTransactionModal } from '@/features/transaction-management'

const MobileSidebar = () => {
  const router = useRouter()
  const isMobile = useIsMobile()

  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(path + '/')
  }

  if (!isMobile) {
    return null
  }

  return (
    <Grid width={'100%'} boxShadow={'2xl'} templateColumns={"repeat(5, 1fr)"} alignItems={'center'}>
      {
        MOBILE_SIDEBAR_LIST.map(el => {
          if (el.path === 'button_add') {
            return (
              <Flex key={el.path} align={'center'} justify={'center'} w={'100%'} height={'100%'}>
                <AddTransactionModal nameButton={el.icon}/>
                {/* <IconButton variant={'primary'} width={'60%'} height={'60%'}>{el.icon}</IconButton> */}
              </Flex>
            )
          }

          return (
            <VStack
              key={el.path}
              p={2}
              color={isActive(el.path) ? 'primary' : 'none'}
              onClick={() => router.push(el.path)}
            >
              <Icon fontSize="lg">{el.icon}</Icon>
              <Text fontSize="sm" color={'inherit'}>{el.title}</Text>
            </VStack>
          )
        })
      }
    </Grid>
  )
}

export default MobileSidebar
