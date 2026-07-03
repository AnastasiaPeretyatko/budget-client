"use client"

import { Field } from "@chakra-ui/react"
import { AsyncSelect, MultiValue } from "chakra-react-select"
import { useRef, useState } from "react"
import { getAllTagsRequest } from "@/entities/tag"
import { COLOR } from "@/shared/config/colors"

export type TagSelectOption = {
  label: string
  value: string
  color: string
}

type Props = {
  defaultSelected?: TagSelectOption[]
  onChange?: (ids: string[]) => void
  label?: string
  placeholder?: string
}

const TagSelectInput = ({ defaultSelected = [], onChange, label, placeholder = 'Выберите теги...' }: Props) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [selected, setSelected] = useState<TagSelectOption[]>(defaultSelected)

  const loadOptions = (inputValue: string): Promise<TagSelectOption[]> =>
    new Promise((resolve) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(async () => {
        try {
          const res = await getAllTagsRequest(inputValue || undefined)
          resolve(res.data.map(t => ({ label: t.name, value: t.id, color: t.color })))
        } catch {
          resolve([])
        }
      }, 300)
    })

  const handleChange = (options: MultiValue<TagSelectOption>) => {
    const next = [...options]
    setSelected(next)
    onChange?.(next.map(o => o.value))
  }

  return (
    <Field.Root width="100%">
      {label && <Field.Label color={COLOR.LABEL}>{label}</Field.Label>}
      <AsyncSelect<TagSelectOption, true>
        isMulti
        loadOptions={loadOptions}
        defaultOptions
        value={selected}
        onChange={handleChange}
        closeMenuOnSelect={false}
        placeholder={placeholder}
        noOptionsMessage={() => "Теги не найдены"}
        loadingMessage={() => "Загрузка..."}
        formatOptionLabel={(option, { context }) => (
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {context === "menu" && (
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: option.color,
                  flexShrink: 0,
                }}
              />
            )}
            {option.label}
          </span>
        )}
        chakraStyles={{
          container: (base) => ({
            ...base,
            width: "100%",
          }),
          control: (base) => ({
            ...base,
            borderColor: COLOR.BORDER,
            borderRadius: 12,
            fontSize: "sm",
            minHeight: "38px",
            cursor: "text",
          }),
          placeholder: (base) => ({
            ...base,
            color: COLOR.LABEL,
            fontSize: "sm",
          }),
          multiValue: (base, { data }) => ({
            ...base,
            backgroundColor: data.color + "30",
            borderRadius: 6,
            border: `1px solid ${data.color}60`,
          }),
          multiValueLabel: (base, { data }) => ({
            ...base,
            color: data.color,
            fontSize: "xs",
            fontWeight: 600,
            paddingInlineEnd: 1,
          }),
          multiValueRemove: (base, { data }) => ({
            ...base,
            color: data.color,
            borderRadius: "0 6px 6px 0",
            _hover: {
              backgroundColor: data.color + "50",
              color: data.color,
            },
          }),
          option: (base, { isFocused }) => ({
            ...base,
            fontSize: "sm",
            backgroundColor: isFocused ? "#27272a" : "transparent",
            cursor: "pointer",
          }),
          dropdownIndicator: () => ({ display: "none" }),
          indicatorSeparator: () => ({ display: "none" }),
        }}
      />
    </Field.Root>
  )
}

export default TagSelectInput
