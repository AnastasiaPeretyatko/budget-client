import SearchSelect, { SearchSelectOption } from '@/shared/ui/search-select'
import { getAllSavingRequest } from '@/entities/saving-account'
import { useCallback } from 'react'

type Props = {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

const SavingAccountSearchSelect = ({ value, onChange, placeholder = "Накопительный счёт" }: Props) => {
  const fetchOptions = useCallback(async (search: string): Promise<SearchSelectOption[]> => {
    const res = await getAllSavingRequest(search)
    return res.data.map((item) => ({
      label: item.name,
      value: item.id,
    }))
  }, [])

  return (
    <SearchSelect
      fetchOptions={fetchOptions}
      value={value}
      onChange={(val) => onChange?.(val)}
      placeholder={placeholder}
    />
  )
}

export default SavingAccountSearchSelect
