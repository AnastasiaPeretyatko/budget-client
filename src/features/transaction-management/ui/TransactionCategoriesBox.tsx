import { useGetCategoriesQuery } from '@/entities/category/api/categoriesApi'
import { Button, Flex, Heading, VStack } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react';

type Props = {
  categoryIds: string[];
  setCategoryIds: Dispatch<SetStateAction<string[]>>
}

const TransactionCategoriesBox = ({ categoryIds, setCategoryIds }: Props) => {
  const { data, isLoading } = useGetCategoriesQuery()

  return (
    <VStack width={'100%'} align={'start'} pt={2}>
      <Heading fontSize={'16px'} textTransform={'uppercase'}>Категории и бюджетные конверты</Heading>
      <Flex width={'100%'} flexWrap={'wrap'} gap={2}>
        {
          data?.map(category => {
            const isActive = categoryIds.includes(category.id)
            return (
              <Button
                key={category.id}
                variant={'categories'}
                size={'xs'}
                data-current={isActive ? '' : undefined}
                onClick={() => {
                  setCategoryIds(prev =>
                    prev.includes(category.id) ?
                      prev.filter(item => item !== category.id) :
                      [...prev, category.id])
                }}
              >{category.name}</Button>
            )
          })
        }
      </Flex>
    </VStack>
  )
}

export default TransactionCategoriesBox
