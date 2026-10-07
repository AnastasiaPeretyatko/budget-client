import { defineSlotRecipe } from '@chakra-ui/react';
import { tabsAnatomy } from '@chakra-ui/react/anatomy';

export const tabsRecipe = defineSlotRecipe({
  slots: tabsAnatomy.keys(),
  variants: {
    variant: {
      primary: {
        trigger: {
          border: 'unset',
          _selected: {
            color: 'primary',
          }
        },
        indicator: {
          borderRadius: 'unset',
          borderBottom: '1px solid #00855D',
          boxShadow: 'unset',
          bg: 'unset'
        }
      }
    }
  },
})
