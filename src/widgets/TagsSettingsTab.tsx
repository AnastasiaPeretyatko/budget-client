import { useSelectedPeriod } from '@/entities/bulling-period/api/useSelectedPeriod'
import { useGetTagsQuery } from '@/entities/tag/api/tagsApi'
import { VStack } from '@chakra-ui/react'
import React from 'react'
import TagCreateCard from './TagCreateCard'
import TagsRegistry from './TagsRegistry'

const TagsSettingsTab = () => {
  const { selectedPeriodId } = useSelectedPeriod()
  const { data = [] } = useGetTagsQuery({ periodId: selectedPeriodId ?? undefined })

  return (
    <VStack width={'100%'} align={'start'}>
      <TagCreateCard tags={data}/>
      <TagsRegistry tags={data}/>
    </VStack>
  )
}

export default TagsSettingsTab
