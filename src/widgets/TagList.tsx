import { TagType } from '@/entities/tag'
import { Badge, HStack } from '@chakra-ui/react'

type Props = {
  tags: TagType[]
}

const TagList = ({ tags }: Props) => {
  return (
    <HStack align={'start'}>
      {tags.map(tag => (
        <Badge
          key={tag.id}
          size={'sm'}
          borderRadius={'full'}
          px={2}
          fontSize={'2xs'}
          style={{
            backgroundColor: tag.color + '28',
            color: tag.color,
            border: `1px solid ${tag.color}55`,
          }}
        >
          #{tag.name}
        </Badge>
      ))}
    </HStack>
  )
}

export default TagList
