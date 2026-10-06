import { DataList } from '@chakra-ui/react'
import { CSSProperties } from 'react';

type Props = {
  data: {value: string; label: string}[];
  style?: CSSProperties
}

const BaseDataList = ({ data, style }: Props) => {
  return (
    <DataList.Root style={style} orientation={'horizontal'}>
      {
        data.map((item) => (
          <DataList.Item key={item.label} justifyContent={'space-between'}>
            <DataList.ItemLabel textTransform={'uppercase'} fontSize={'10px'} fontWeight={'600'} color={'text.sidebar'}>{item.label}</DataList.ItemLabel>
            <DataList.ItemValue flex={'unset'}>{item.value}</DataList.ItemValue>
          </DataList.Item>
        ))
      }
    </DataList.Root>
  )
}

export default BaseDataList
