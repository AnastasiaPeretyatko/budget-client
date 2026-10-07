import { defineSlotRecipe } from '@chakra-ui/react';
import { datePickerAnatomy } from '@chakra-ui/react/anatomy';

export const datePickerRecipe = defineSlotRecipe({
  slots: datePickerAnatomy.keys(),
  base: {
    input: {
      borderRadius: '12px',
      fontSize: '12px',
      backgroundColor: '#F1F5F9',
      _placeholder: {
        color: '#94A3B8'
      }
    }
  },
  variants: {
    size: {
      sm: {},
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})
