import { ReactNode } from 'react'
import {
  Card,
  Spinner,
  chakra,
  useSlotRecipe,
  type RecipeVariantProps,
} from '@chakra-ui/react'
import { InfoTip } from '@/shared/ui/toggle-tip'
import { AmountText } from '@/shared/ui/amount-text'
import { summaryCardRecipe } from '@/shared/config/theme/system'

export const formatAmount = (value: number) =>
  value.toLocaleString('ru-RU', { minimumFractionDigits: 2 })

export const ChangeLabel = ({ percent, sign }: { percent: number; sign: '+' | '-' }) => (
  <AmountText tone={sign === '+' ? 'income' : 'danger'} size="xs">
    {sign}{Math.round(percent)}% к прошлому периоду
  </AmountText>
)

type SummaryCardVariants = RecipeVariantProps<typeof summaryCardRecipe>

export type SummaryCardProps = {
  label: string
  value: ReactNode
  change?: ReactNode
  /** Иконка, оборачивается в стилизованный слот badge (цвет/фон берутся из tone). */
  icon?: ReactNode
  /** Полностью кастомный badge-узел (например прогресс-круг), в обход слота. */
  badge?: ReactNode
  isLoading?: boolean
} & SummaryCardVariants

const SummaryCard = ({
  label,
  value,
  change,
  icon,
  badge,
  isLoading,
  ...variantProps
}: SummaryCardProps) => {
  const recipe = useSlotRecipe({ key: 'summaryCard' })
  const styles = recipe(variantProps)

  return (
    <Card.Root css={styles.root}>
      <Card.Body css={styles.body}>
        <chakra.div display="flex" w="100%" justifyContent="space-between" alignItems="center">
          <chakra.div display="flex" flexDir="column" gap={1} flex={1} minW={0}>
            <chakra.div css={styles.header}>
              <chakra.span css={styles.label}>{label}</chakra.span>
              <InfoTip />
            </chakra.div>
            {isLoading ? (
              <Spinner size="sm" />
            ) : (
              <>
                <chakra.div css={styles.value}>{value}</chakra.div>
                {change}
              </>
            )}
          </chakra.div>
          {badge ?? (icon ? <chakra.div css={styles.badge}>{icon}</chakra.div> : null)}
        </chakra.div>
      </Card.Body>
    </Card.Root>
  )
}

export default SummaryCard
