import { defineSlotRecipe } from '@chakra-ui/react';
import { comboboxAnatomy } from '@chakra-ui/react/anatomy';

// Combobox — поле с поиском и выпадающим списком. Стили повторяют select-recipe / input-recipe,
// чтобы поля выглядели одинаково. Подключается в theme.slotRecipes.
export const comboboxRecipe = defineSlotRecipe({
  slots: comboboxAnatomy.keys(),
  base: {
    input: {
      borderRadius: '12px',
      fontSize: '12px',
      _placeholder: {
        color: '#94A3B8',
      },
    },
  },
  variants: {
    variant: {
      primary: {
        input: {
          bg: '#F1F5F9',
          color: '#334155',
          borderWidth: '1px',
          borderColor: 'outline',
        },
        trigger: {
          color: '#94A3B8',
        },
        label: {
          fontWeight: 600,
          fontSize: '14px',
          color: '#64748B',
        },
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
