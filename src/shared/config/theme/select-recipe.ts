import { defineSlotRecipe } from '@chakra-ui/react';
import { selectAnatomy } from '@chakra-ui/react/anatomy';

// Select — составной компонент (root, trigger, content, item...), поэтому тут слот-рецепт,
// а стили раскладываются по частям. Подключать нужно в theme.slotRecipes, а не в recipes.
export const selectRecipe = defineSlotRecipe({
  slots: selectAnatomy.keys(),
  base: {
    trigger: {
      borderRadius: '12px',
      fontSize: '12px',
      // у Select плейсхолдер — это состояние «значение не выбрано», а не _placeholder как у Input
      _placeholderShown: {
        color: '#94A3B8',
      },
    },
  },
  variants: {
    variant: {
      primary: {
        trigger: {
          bg: '#F1F5F9',
          color: '#334155',
        },
        indicator: {
          color: '#94A3B8',
        },
        label: {
          fontWeight: 600,
          fontSize: '14px',
          color: '#64748B'
        }
      },
    },
    size: {
      sm: {},
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})
