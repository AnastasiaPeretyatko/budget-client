import { useBreakpointValue } from '@chakra-ui/react';

export function useIsMobile () {
  const isMobile = useBreakpointValue({
    base: true,
    lg: false
  });

  return isMobile
}
