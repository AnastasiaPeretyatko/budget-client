import { defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
  base: {
    borderRadius: '12px',
    fontSize: '12px'
  },
  variants: {
    variant: {
      primary: {
        bg: 'primary',
        color: 'white',
        transition: 'transform 0.2s ease',
        _hover: {
          transform: 'scale(1.1)'
        }
      },
      secondary: {
        bg: '#F1F5F9',
        color: '#334155',
      },
      sidebar: {
        width: '100%',
        display: 'flex',
        justifyContent: 'start',
        gap: 3,
        padding: '10px 12px',
        cursor: 'pointer',
        bg: 'transparent',
        color: 'text.sidebar',
        transition: "background 0.15s, color 0.15s",
        _current: {
          bg: 'primary',
          color: 'white',
        },
        // своё состояние: _collapsed в Chakra не существует, поэтому пишем селектор атрибута сами
        '&[data-collapsed]': {
          justifyContent: 'center'
        },
        _hover: {
          bg: 'primary',
          color: 'white',
        }
      },
      filter: {
        padding: '4px 12px',
        fontSize: '12px',
        color: '#475569',
        _current: {
          bg: 'white',
          color: '#1E293B',
        }
      },
      unstyle: {
        bg: 'transparent',
        _hover: {
          bg: 'transparent'
        }
      },
      badge: {
        color: '#64748B',
        bg: '#F1F5F9',
        fontSize: '12px',
        px: '4px',
        boxShadow: 'sm',
        transition: 'transform 0.2s ease',
        height: 'unset',
        _hover: {
          bg: 'white',
          transform: 'scale(1.1)'
        }
      },
      categories: {
        bg: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'medium',
        color: '#334155',
        transition: 'transform 0.2s ease',
        _hover: {
          transform: 'scale(1.1)'
        },
        _current: {
          bg: 'primary',
          color: 'white'
        }
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

