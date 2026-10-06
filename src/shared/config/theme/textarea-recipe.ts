import { defineRecipe } from '@chakra-ui/react';

export const textareaRecipe = defineRecipe({
  base: {
    borderRadius: '12px',
    fontSize: '12px',
    _placeholder: {
      color: '#94A3B8'
    }
  },
  variants: {
    variant: {
      primary: {
        bg: '#F1F5F9',
        color: '#334155',
      }
    },
    size: {
      sm: {},
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

