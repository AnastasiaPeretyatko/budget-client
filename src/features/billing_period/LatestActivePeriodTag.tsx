import { COLOR } from '@/shared/config/colors'
import { Flex } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

const LatestActivePeriodTag = () => {
  const { latestPeriod } = useSelector((state: RootState) => state.billingPeriod)

  return (
    <Flex padding={'2px 6px'} borderRadius={4} fontSize={'sm'} align={'center'} gap={2} bgColor={COLOR.BORDER}>
      {moment(latestPeriod?.startDate).format('DD.MM.YYYY')}
      <FaArrowRightLong />
      {moment(latestPeriod?.endDate).format('DD.MM.YYYY')}
    </Flex>
  )
}

export default LatestActivePeriodTag
