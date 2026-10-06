import { defineSlotRecipe } from '@chakra-ui/react';
import { tableAnatomy } from '@chakra-ui/react/anatomy';

export const tableRecipe = defineSlotRecipe({
  slots: tableAnatomy.keys(),
  variants: {
    variant: {
      primary: {
        columnHeader: {
          color: '#94A3B8',
          fontSize: '12px',
          textTransform: 'uppercase',
        },
        row: {
          _notLast: {
            borderBottom: '1px solid #ECFDF5'
          }
        }

      },
    },
  },
})
