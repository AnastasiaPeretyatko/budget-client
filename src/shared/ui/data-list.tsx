import { DataList } from '@chakra-ui/react'
import { CSSProperties, ReactNode } from 'react';

type Props = {
  data: {value: string | ReactNode | undefined; label: string}[];
  style?: CSSProperties
}

const BaseDataList = ({ data, style }: Props) => {
  return (
    <DataList.Root style={style} orientation={'horizontal'}>
      {
        data.map((item) => (
          <DataList.Item key={item.label} justifyContent={'space-between'}>
            <DataList.ItemLabel textTransform={'uppercase'} fontSize={'10px'} fontWeight={'600'} color={'text.label'}>{item.label}</DataList.ItemLabel>
            <DataList.ItemValue justifyContent={'end'} whiteSpace={'nowrap'}>{item.value}</DataList.ItemValue>
          </DataList.Item>
        ))
      }
    </DataList.Root>
  )
}

export default BaseDataList
