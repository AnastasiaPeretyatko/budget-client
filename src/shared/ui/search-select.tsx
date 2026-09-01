"use client"

import { Field } from "@chakra-ui/react"
import { AsyncCreatableSelect } from "chakra-react-select"
import { useEffect, useRef, useState } from "react"
import { COLOR } from "../config/colors"

export type SearchSelectOption = {
  label: string
  value: string
}

type Props = {
  fetchOptions: (search: string) => Promise<SearchSelectOption[]>
  value?: SearchSelectOption
  onChange?: (value: string, option: SearchSelectOption) => void
  onCreate?: (name: string) => Promise<SearchSelectOption>
  placeholder?: string
  debounceMs?: number
  label?: string
  invalid?: boolean
  errorText?: string
}

const SearchSelect = ({
  fetchOptions,
  value,
  onChange,
  onCreate,
  placeholder = "Select...",
  debounceMs = 400,
  label,
  invalid,
  errorText,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<SearchSelectOption | null>(value || null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setSelectedOption(value ?? null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.value])

  const loadOptions = (inputValue: string): Promise<SearchSelectOption[]> =>
    new Promise((resolve) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(async () => {
        try {
          resolve(await fetchOptions(inputValue))
        } catch {
          resolve([])
        }
      }, debounceMs)
    })

  const handleChange = (option: SearchSelectOption | null) => {
    setSelectedOption(option)
    if (option) onChange?.(option.value, option)
  }

  const handleCreate = async (inputValue: string) => {
    if (!onCreate) return
    const newOption = await onCreate(inputValue)
    setSelectedOption(newOption)
    onChange?.(newOption.value, newOption)
  }

  return (
    <Field.Root invalid={invalid}>
      {label && <Field.Label color={COLOR.LABEL}>{label}</Field.Label>}
      <AsyncCreatableSelect<SearchSelectOption>
        loadOptions={loadOptions}
        defaultOptions
        value={selectedOption}
        onChange={handleChange}
        onCreateOption={onCreate ? handleCreate : undefined}
        placeholder={placeholder}
        formatCreateLabel={(inputValue) => `Создать: ${inputValue}`}
        noOptionsMessage={() => "Ничего не найдено"}
        loadingMessage={() => "Загрузка..."}
        chakraStyles={{
          control: (base) => ({
            ...base,
            borderColor: invalid ? "red.500" : COLOR.BORDER,
            borderRadius: 12,
            fontSize: "sm",
          }),
        }}
      />
      {invalid && errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
    </Field.Root>
  )
}

export default SearchSelect
