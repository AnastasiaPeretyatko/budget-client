import { ReactNode } from 'react'
import { Box, Card, HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import { COLOR } from '@/shared/config/colors'
import { InfoTip } from '@/shared/ui/toggle-tip'

export const formatAmount = (value: number) =>
  value.toLocaleString('ru-RU', { minimumFractionDigits: 2 })

export const ChangeLabel = ({ percent, sign }: { percent: number; sign: '+' | '-' }) => {
  const color = sign === '+' ? COLOR.INCOME_TEXT : COLOR.DANGER_TEXT
  return (
    <Text fontSize="xs" color={color} fontWeight={500}>
      {sign}{Math.round(percent)}% к прошлому периоду
    </Text>
  )
}

export const IconBadge = ({ icon, bg }: { icon: ReactNode; bg: string }) => (
  <Box
    flexShrink={0}
    w="44px"
    h="44px"
    borderRadius="full"
    bg={bg}
    display="flex"
    alignItems="center"
    justifyContent="center"
    fontSize="20px"
    color="white"
  >
    {icon}
  </Box>
)

export interface SummaryCardProps {
  label: string
  value: ReactNode
  change?: ReactNode
  badge: ReactNode
  isLoading?: boolean
  accentColor: string
}

const SummaryCard = ({ label, value, change, badge, isLoading, accentColor }: SummaryCardProps) => (
  <Card.Root
    flex={1}
    style={{
      background: `linear-gradient(135deg, ${accentColor}18 0%, transparent 60%)`,
    }}
  >
    <Card.Body p={4}>
      <HStack width="100%" justify="space-between" align="center">
        <VStack align="start" gap={1} flex={1} minW={0}>
          <HStack gap={1}>
            <Text color={COLOR.LABEL} fontWeight={500} fontSize="sm">{label}</Text>
            <InfoTip />
          </HStack>
          {isLoading ? (
            <Spinner size="sm" />
          ) : (
            <>
              {value}
              {change}
            </>
          )}
        </VStack>
        {badge}
      </HStack>
    </Card.Body>
  </Card.Root>
)

export default SummaryCard
