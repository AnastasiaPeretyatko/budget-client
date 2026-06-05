import { getLatestActivePeriod } from '@/entities/bulling-period/api/bulling-period.service'
import { COLOR } from '@/shared/config/colors'
import { Flex } from '@chakra-ui/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'

const LatestActivePeriodTag = () => {
  const [latestPeriod, setLatestPeriod] =
    useState<{startDate: string; endDate: string} | null>(null)

  useEffect(() => {
    getLatestActivePeriod()
      .then(({ data }) => setLatestPeriod(data))
      .catch(() => console.log('error'))
  }, [])

  return (
    <Flex padding={'2px 6px'} borderRadius={4} fontSize={'sm'} align={'center'} gap={2} bgColor={COLOR.BORDER}>
      {moment(latestPeriod?.startDate).format('DD.MM.YYYY')}
      <FaArrowRightLong />
      {moment(latestPeriod?.endDate).format('DD.MM.YYYY')}
    </Flex>
  )
}

export default LatestActivePeriodTag
