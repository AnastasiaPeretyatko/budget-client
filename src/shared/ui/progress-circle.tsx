import { ProgressCircle } from '@chakra-ui/react'

type Props = {
  value: number | string
} & ProgressCircle.RootProps

const ProgressCircleUI = ({ value, ...props }: Props) => {
  return (
    <ProgressCircle.Root value={+value} {...props}>
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range strokeLinecap={'round'}/>
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  )
}

export default ProgressCircleUI
