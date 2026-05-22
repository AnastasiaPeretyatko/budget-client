import SearchSelect, { SearchSelectOption } from '@/shared/ui/search-select'
import { getAllCategoryRequest } from '@/entities/category'
import { useCallback } from 'react'

type Props = {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

const CategorySearchSelect = ({ value, onChange, placeholder = "Категория" }: Props) => {
  const fetchOptions = useCallback(async (search: string): Promise<SearchSelectOption[]> => {
    const res = await getAllCategoryRequest(search)
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

export default CategorySearchSelect
