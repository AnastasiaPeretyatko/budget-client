import { JSX, useMemo, useState } from 'react'
import BasePopover from '../popover'
import { Grid, IconButton, Input, Popover, VStack } from '@chakra-ui/react'
import { ICON_NAMES } from './icon-list';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { COLOR } from '@/shared/config/colors';

export type IconName = (typeof ICON_NAMES)[number];

type Props = {
  value: IconName | null,
  onChange?: (iconName: IconName) => void
  disabled?: boolean
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
}

const IconPicker = ({ value, onChange, disabled }: Props) => {
  const [search, setSearch] = useState('');

  const filteredIcons = useMemo(() => {
    if (!search.trim()) return ICON_NAMES;
    const query = search.trim().toLowerCase();
    return ICON_NAMES.filter((name) => name.toLowerCase().includes(query));
  }, [search]);

  const selectedIcon: JSX.Element = useMemo(() => {
    const IconComponent = LucideIcons[value || 'Wallet'] as LucideIcon;
    return <IconComponent style={{ width: 24, height: 24 }} color={COLOR.PRIMARY_COLOR}/>;
  }, [value]);

  return (
    <BasePopover
      TriggerButton={<IconButton
        style={disabled ? {
          width: 48,
          height: 48,
          opacity: 'none',
          cursor: 'auto'
        } : {
          width: 56,
          height: 56
        }}
        bg={'#EAEDFF'}
        borderRadius={10}
        disabled={disabled}
      >{selectedIcon}</IconButton>}
    >
      <VStack gap={4}>
        <Input size={'xs'} value={search} onChange={e => setSearch(e.target.value)}/>
        <Grid width={'100%'} templateColumns={"repeat(6, 35px)"} gap={2} maxHeight={'200px'} overflow={'auto'}>
          {
            filteredIcons.map(name => {
              const IconComponent = LucideIcons[name] as LucideIcon;
              const isSelected = value === name

              return (
                <Popover.CloseTrigger asChild key={name}>
                  <IconButton
                    key={name}
                    variant={'outline'}
                    size={'xs'}
                    borderColor={isSelected ? 'white' : 'none'}
                    borderWidth={'1px'}
                    onClick={() => onChange?.(name)}
                  >
                    <IconComponent size={18} />
                  </IconButton>
                </Popover.CloseTrigger>
              )
            })
          }
        </Grid>
      </VStack>
    </BasePopover>
  )
}

export default IconPicker
