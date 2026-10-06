import { defineSlotRecipe } from '@chakra-ui/react';
import { cardAnatomy } from '@chakra-ui/react/anatomy';

// Рецепт для встроенного Card. Ключ в slotRecipes должен быть именно `card`,
// иначе <Card.Root variant="primary" /> его не увидит.
export const cardRecipe = defineSlotRecipe({
  slots: cardAnatomy.keys(),
  variants: {
    variant: {
      primary: {
        root: {
          borderRadius: '16px',
          borderColor: '#E2E8F0',
          borderWidth: '1px',
          bg: '#FFFFFF',
          boxShadow: 'md',
          padding: '20px',
        },
      },
    },
  },
})

export const summaryCardRecipe = defineSlotRecipe({
  className: 'summary-card',
  slots: ['root', 'body', 'header', 'label', 'value', 'badge'],
  base: {
    root: { flex: 1, borderRadius: 'lg', overflow: 'hidden' },
    body: { p: 4 },
    header: { display: 'flex', alignItems: 'center', gap: 1 },
    label: { color: 'label.fg', fontWeight: 500, fontSize: 'sm' },
    value: { minW: 0 },
    badge: {
      flexShrink: 0,
      w: '44px',
      h: '44px',
      borderRadius: 'full',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
    },
  },
  variants: {
    variant: {
      primary: {
        root: {
          borderRadius: '16px',
          borderColor: '#E2E8F0',
          borderWidth: '1px',
          bg: '#FFFFFF',
          boxShadow: 'md',
          padding: '20px'
        }

      }
    },
    tone: {
      // primary: toneVariant('primary'),
      // income: toneVariant('income'),
      // expense: toneVariant('expense'),
      // period: toneVariant('period'),
    },
  },
  defaultVariants: {
    variant: 'primary'
    // tone: 'primary',
  },
})
