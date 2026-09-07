import {
  chakra,
  useRecipe,
  type HTMLChakraProps,
  type RecipeVariantProps,
} from '@chakra-ui/react'
import { amountTextRecipe } from '@/shared/config/theme/system'

type AmountTextVariants = RecipeVariantProps<typeof amountTextRecipe>

export type AmountTextProps = HTMLChakraProps<'span'> & AmountTextVariants

export const AmountText = (props: AmountTextProps) => {
  const recipe = useRecipe({ key: 'amountText' })
  const [variantProps, rest] = recipe.splitVariantProps(props)
  const styles = recipe(variantProps)

  return <chakra.span css={styles} {...rest} />
}
