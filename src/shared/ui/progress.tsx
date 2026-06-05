import { HStack, ProgressLabel, ProgressRange, ProgressRoot, ProgressTrack, ProgressValueText } from "@chakra-ui/react"
import { useMemo } from 'react'

type ProgressProps = {
  spend: number
  remaining: number
}

const Progress = ({ remaining, spend }: ProgressProps) => {
  const defaultValue = useMemo(() => spend / (remaining + spend) * 100, [remaining, spend])

  return (
    <ProgressRoot defaultValue={defaultValue || 0} maxW="sm">
      <HStack gap="5">
        <ProgressLabel>{spend || 0} ₽</ProgressLabel>
        <ProgressTrack flex="1">
          <ProgressRange />
        </ProgressTrack>
        <ProgressValueText>{remaining ||0} ₽</ProgressValueText>
      </HStack>
    </ProgressRoot>
  )
}

export default Progress
