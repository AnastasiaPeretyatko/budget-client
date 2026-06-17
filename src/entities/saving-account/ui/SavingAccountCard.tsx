import { Badge, Box, Card, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { SavingAccountType } from '../types/saving-account.type'
import { COLOR } from '@/shared/config/colors'
import ProgressCircleUI from '@/shared/ui/progress-circle'
import { formatAmount } from '@/shared/ui/SummaryCard'

type Props = {
  savingAccount: SavingAccountType
  onClick?: (id: string) => void
}

const SavingAccountCard = ({ savingAccount, onClick }: Props) => {
  const currentBalance = Number(savingAccount.amount)
  const periodExpense = Number(savingAccount.periodExpense)
  const periodMax = Number(savingAccount.periodStartBalance) + Number(savingAccount.periodIncome)
  const progress = periodMax > 0 ? Math.min(Math.round((currentBalance / periodMax) * 100), 100) : 0

  return (
    <Card.Root
      width="100%"
      minH={'100%'}
      borderRadius={'2xl'}
      overflow={'hidden'}
      _hover={{ cursor: 'pointer', backgroundColor: 'gray.900' }}
      onClick={() => onClick && onClick(savingAccount.id)}
    >
      <Card.Body display={'flex'} flexDirection={'column'} padding={4} gap={4}>
        <HStack width={'100%'} gap={3}>
          <Box
            width={10}
            height={10}
            bgColor={COLOR.BACKGROUND}
            borderRadius={'50%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            fontSize={'xl'}
            flexShrink={0}
          >
            {savingAccount.emoji ?? '💰'}
          </Box>
          <HStack gap={2} flexWrap={'wrap'}>
            <Heading size={'sm'}>{savingAccount.name}</Heading>
            {savingAccount.workspaceName && (
              <Badge size={'sm'} variant={'subtle'} colorPalette={'purple'}>{savingAccount.workspaceName}</Badge>
            )}
          </HStack>
        </HStack>
        <HStack width={'100%'} gap={4}>
          <ProgressCircleUI size={'xl'} value={progress} />
          <VStack align={'start'} gap={0}>
            <Text fontWeight={600}>{formatAmount(currentBalance)} ₽</Text>
            <Text color={COLOR.LABEL} fontSize={'xs'}>из {formatAmount(periodMax)} ₽</Text>
          </VStack>
        </HStack>
      </Card.Body>
      <Card.Footer
        padding={4}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        background={'linear-gradient(to right, rgba(255,255,255,0.04), rgba(255,255,255,0.07))'}
        borderTop={`1px solid ${COLOR.BORDER}`}
      >
        <Text fontSize={'xs'} color={COLOR.LABEL}>
          Потрачено{' '}
          <Text as={'span'} color={COLOR.EXPENSE_TEXT} fontWeight={600}>
            {formatAmount(periodExpense)} ₽
          </Text>
        </Text>
        <Text fontSize={'xs'} color={COLOR.LABEL}>{savingAccount.transactionCount} операций</Text>
      </Card.Footer>
    </Card.Root>
  )
}

export default SavingAccountCard
