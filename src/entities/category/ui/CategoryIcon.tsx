import { ICON_NAMES } from '@/shared/ui/icon-picker'
import { Box } from '@chakra-ui/react'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Props = {
  icon?: string | null
  color?: string | null
}

const CategoryIcon = ({ icon, color }: Props) => {
  // у старых категорий в icon лежит эмодзи, у новых — имя иконки из lucide
  const iconName = ICON_NAMES.find(name => name === icon)
  const Icon = iconName ? LucideIcons[iconName] as LucideIcon : null

  return (
    <Box
      width={'40px'}
      height={'40px'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexShrink={0}
      borderRadius={'12px'}
      fontSize={'18px'}
      bg={color ? `${color}1A` : '#F1F5F9'}
      color={color ?? '#64748B'}
    >
      {Icon ? <Icon size={18}/> : icon}
    </Box>
  )
}

export default CategoryIcon
