import { HStack, ProgressLabel, ProgressRange, ProgressRoot, ProgressTrack, ProgressValueText } from "@chakra-ui/react"
import { useMemo } from 'react'

type ProgressProps = {
  spend: number
  remaining: number
}

const Progress = ({ remaining, spend }: ProgressProps) => {
  const defaultValue = useMemo(() => spend / (remaining + spend) * 100, [remaining, spend])

  return (
    <ProgressRoot width={'100%'} defaultValue={defaultValue || 0}>
      <HStack gap="5">
        <ProgressLabel fontSize="xs">{spend || 0} ₽</ProgressLabel>
        <ProgressTrack flex="1">
          <ProgressRange />
        </ProgressTrack>
        <ProgressValueText fontSize="xs">{remaining ||0} ₽</ProgressValueText>
      </HStack>
    </ProgressRoot>
  )
}

export default Progress
