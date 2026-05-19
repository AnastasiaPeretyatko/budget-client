import { RootState } from '@/common/store.config'
import SelectComponent from '@/components/ui/select'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

type Props = {
  onChange: (value: string) => void
  placeholder?: string
  maxWidth?: string
  value?: string
}

const SelectListSavingAccount = (props: Props) => {
  const { saving } = useSelector((state: RootState) => state.saving)

  const list = useMemo(() => {
    if (!saving) return []
    return saving.map((item) => ({
      label: item.name,
      value: item.id
    }))
  }, [saving])

  return (
    <SelectComponent list={list} {...props}/>
  )
}

export default SelectListSavingAccount
