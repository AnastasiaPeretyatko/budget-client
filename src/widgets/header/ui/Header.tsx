import { PUBLIC_ROUTES } from '@/shared/config/routes'
import { Button, Heading, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()

  const isPublic = PUBLIC_ROUTES.includes(router.pathname)

  return (
    <HStack width={"100%"} justify={'space-between'} padding={6}>
      <Heading textTransform={'uppercase'}>Budget home</Heading>
      {
        isPublic
          ? <Button size={'sm'} variant={'surface'} onClick={() => router.push('/login')}>Войти</Button>
          : <Button size={'sm'} variant={'surface'} onClick={() => router.push('/login')}>Выйти</Button>
      }
    </HStack>
  )
}

export default Header
