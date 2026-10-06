import { defineRecipe } from '@chakra-ui/react';

export const badgeRecipe = defineRecipe({
  base: {
    borderRadius: '12px',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontWeight: 600,
    color: '#64748B',
    bg: '#F1F5F9'
  },
  variants: {
    variant: {
      green: {
        bg: '#D1FAE5',
        color:'#065F46'
      },
      yellow: {
        bg: '#FFFBEB',
        color: '#B45309'
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

