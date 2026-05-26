import SearchSelect, { SearchSelectOption } from '@/shared/ui/search-select'
import { getAllSavingRequest, postSavingRequest } from '@/entities/saving-account'
import { useCallback } from 'react'

type Props = {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  creatable?: boolean
}

const SavingAccountSearchSelect = ({ value, onChange, placeholder = "Накопительный счёт", creatable = true }: Props) => {
  const fetchOptions = useCallback(async (search: string): Promise<SearchSelectOption[]> => {
    const res = await getAllSavingRequest(search)
    return res.data.map((item) => ({
      label: item.name,
      value: item.id,
    }))
  }, [])

  const handleCreate = useCallback(async (name: string): Promise<SearchSelectOption> => {
    const res = await postSavingRequest({ name, amount: '0', description: null })
    return { label: res.data.name, value: res.data.id }
  }, [])

  return (
    <SearchSelect
      fetchOptions={fetchOptions}
      value={value}
      onChange={(val) => onChange?.(val)}
      onCreate={creatable ? handleCreate : undefined}
      placeholder={placeholder}
    />
  )
}

export default SavingAccountSearchSelect
