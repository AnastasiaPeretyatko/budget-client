"use client"

import { Combobox, createListCollection, Field, Portal, Spinner } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { useAsyncOptions } from "../utils/useAsyncOptions"

export type SearchSelectOption = {
  label: string
  value: string
}

// пункт «Создать: ...» — обычный элемент списка с особым value
type Item = SearchSelectOption & { isCreate?: boolean }
const CREATE_VALUE = "__create__"

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
  const { options, isLoading, search, setSearch } = useAsyncOptions(fetchOptions, debounceMs)
  const [selected, setSelected] = useState<SearchSelectOption | null>(value || null)
  // текст в поле: пока печатаем — то, что печатаем, после выбора — название выбранного
  const [inputValue, setInputValue] = useState(value?.label ?? "")

  useEffect(() => {
    setSelected(value ?? null)
    setInputValue(value?.label ?? "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.value])

  const collection = useMemo(() => {
    const items: Item[] = [...options]
    // выбранный вариант должен быть в списке, даже если сервер его не вернул
    if (!search && selected?.value && !items.some((o) => o.value === selected.value)) {
      items.unshift(selected)
    }
    const name = search.trim()
    if (onCreate && name && !items.some((o) => o.label.toLowerCase() === name.toLowerCase())) {
      items.push({ label: `Создать: ${name}`, value: CREATE_VALUE, isCreate: true })
    }
    return createListCollection({ items })
  }, [options, search, selected, onCreate])

  const select = (option: SearchSelectOption) => {
    setSelected(option)
    setInputValue(option.label)
    onChange?.(option.value, option)
  }

  const handleValueChange = async ({ items }: Combobox.ValueChangeDetails<Item>) => {
    const item = items[0]
    if (!item) return

    if (!item.isCreate) {
      select({ label: item.label, value: item.value })
      return
    }

    try {
      select(await onCreate!(search.trim()))
      setSearch("")
    } catch {
      // не удалось создать — возвращаем в поле прежний выбор
      setInputValue(selected?.label ?? "")
    }
  }

  const handleInputValueChange = ({ inputValue, reason }: Combobox.InputValueChangeDetails) => {
    setInputValue(inputValue)
    // искать нужно только по тому, что напечатал пользователь, а не по подставленному названию
    if (reason === "input-change" || reason === "clear-trigger") setSearch(inputValue)
  }

  const handleOpenChange = ({ open, reason }: Combobox.OpenChangeDetails) => {
    // при новом открытии показываем полный список, а не остатки прошлого поиска
    if (open && reason !== "input-change") setSearch("")
  }

  return (
    <Field.Root invalid={invalid}>
      <Combobox.Root
        variant="primary"
        collection={collection}
        value={selected ? [selected.value] : []}
        onValueChange={handleValueChange}
        inputValue={inputValue}
        onInputValueChange={handleInputValueChange}
        onOpenChange={handleOpenChange}
        openOnClick
        invalid={invalid}
      >
        {label && <Combobox.Label>{label}</Combobox.Label>}
        <Combobox.Control>
          <Combobox.Input placeholder={placeholder} />
          <Combobox.IndicatorGroup>
            {isLoading && <Spinner size="xs" />}
            <Combobox.Trigger />
          </Combobox.IndicatorGroup>
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content>
              <Combobox.Empty>Ничего не найдено</Combobox.Empty>
              {collection.items.map((item) => (
                <Combobox.Item item={item} key={item.value}>
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
      {invalid && errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
    </Field.Root>
  )
}

export default SearchSelect
