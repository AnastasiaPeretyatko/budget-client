"use client"

import { Combobox, createListCollection, Field, Portal, Spinner } from "@chakra-ui/react"
import { useEffect, useMemo, useRef, useState } from "react"
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
  const cachedOptions = useRef(new Map<string, SearchSelectOption>())

  useEffect(() => {
    for (const option of options) {
      cachedOptions.current.set(option.value, option)
    }
  }, [options])

  useEffect(() => {
    setSelected(value ?? null)
    setInputValue(value?.label ?? "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.value])

  const collection = useMemo(() => {
    const query = search.trim().toLocaleLowerCase()

    // Объединяем кеш и текущие результаты сервера
    const allOptions = new Map(cachedOptions.current)

    for (const option of options) {
      allOptions.set(option.value, option)
    }

    let items: Item[] = [...allOptions.values()]

    // Мгновенная локальная фильтрация и сортировка
    if (query) {
      items = items
        .filter((option) =>
          option.label.toLocaleLowerCase().includes(query)
        )
        .sort((a, b) => {
          const aStarts = a.label.toLocaleLowerCase().startsWith(query)
          const bStarts = b.label.toLocaleLowerCase().startsWith(query)

          // Совпадения с началом строки показываем первыми
          if (aStarts !== bStarts) return aStarts ? -1 : 1

          return a.label.localeCompare(b.label)
        })
    }

    // Сохраняем выбранный вариант
    if (
      !query &&
    selected?.value &&
    !items.some((o) => o.value === selected.value)
    ) {
      items.unshift(selected)
    }

    // Пункт создания
    if (
      onCreate &&
    query &&
    !items.some(
      (o) => o.label.toLocaleLowerCase() === query
    )
    ) {
      items.push({
        label: `Создать: ${search.trim()}`,
        value: CREATE_VALUE,
        isCreate: true,
      })
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
