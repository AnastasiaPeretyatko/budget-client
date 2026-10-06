import { defineSlotRecipe } from '@chakra-ui/react';
import { progressAnatomy } from '@chakra-ui/react/anatomy';

export const progressRecipe = defineSlotRecipe({
  slots: progressAnatomy.keys(),
  variants: {
    variant: {
      primary: {
        root: {
          h: '8px'
        },
        track: {
          bg: '#F1F5F9',
          borderRadius: '50px'
        },
        range: {
          bg: 'primary',
          borderRadius: '50px'
        }
      }
    }
  }
})

