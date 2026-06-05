import SearchSelect, { SearchSelectOption } from '@/shared/ui/search-select'
import { getAllCategoryRequest, postCategoryRequest } from '@/entities/category'
import { useCallback } from 'react'

type Props = {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  creatable?: boolean
  label?: string
}

const CategorySearchSelect = ({ value, onChange, placeholder = "Select category", creatable = true, ...props }: Props) => {
  const fetchOptions = useCallback(async (search: string): Promise<SearchSelectOption[]> => {
    const res = await getAllCategoryRequest(search)
    return res.data.map((item) => ({
      label: item.name,
      value: item.id,
    }))
  }, [])

  const handleCreate = useCallback(async (name: string): Promise<SearchSelectOption> => {
    const res = await postCategoryRequest({ name })
    return { label: res.data.name, value: res.data.id }
  }, [])

  return (
    <SearchSelect
      fetchOptions={fetchOptions}
      value={value}
      onChange={(val) => onChange?.(val)}
      onCreate={creatable ? handleCreate : undefined}
      placeholder={placeholder}
      {...props}
    />
  )
}

export default CategorySearchSelect
