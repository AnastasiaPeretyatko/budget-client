import { Flex } from '@chakra-ui/react'
import Lottie from 'lottie-react'
import * as moneyLottie from './Money.json'

const MoneyAnimation = () => {
  return (
    <Flex>
      <Lottie animationData={moneyLottie} loop style={{ maxHeight: '400px', maxWidth: '400px' }}/>
    </Flex>
  )
}

export default MoneyAnimation
