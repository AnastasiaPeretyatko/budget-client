"use client"

import {
  Box,
  Button,
  CloseButton,
  Combobox,
  Dialog,
  Portal,
  Spinner,
  Text,
  createListCollection,
} from "@chakra-ui/react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export type SearchSelectOption = {
  label: string
  value: string
}

type Props = {
  fetchOptions: (search: string) => Promise<SearchSelectOption[]>
  value?: string
  onChange?: (value: string, option: SearchSelectOption) => void
  onCreate?: (name: string) => Promise<SearchSelectOption>
  placeholder?: string
  debounceMs?: number
}

const SearchSelect = ({
  fetchOptions,
  value,
  onChange,
  onCreate,
  placeholder = "Выберите...",
  debounceMs = 400,
}: Props) => {
  const [items, setItems] = useState<SearchSelectOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [pendingName, setPendingName] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fetchRef = useRef(fetchOptions)
  fetchRef.current = fetchOptions

  const collection = useMemo(
    () =>
      createListCollection({
        items,
        itemToString: (item) => item.label,
        itemToValue: (item) => item.value,
      }),
    [items],
  )

  const loadOptions = useCallback(async (query: string) => {
    setIsLoading(true)
    try {
      const result = await fetchRef.current(query)
      setItems(result)
    } catch {
      setItems([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const debouncedLoad = useCallback(
    (query: string) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => loadOptions(query), debounceMs)
    },
    [debounceMs, loadOptions],
  )

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleInputValueChange = useCallback(
    (details: Combobox.InputValueChangeDetails) => {
      setInputValue(details.inputValue)
      debouncedLoad(details.inputValue)
    },
    [debouncedLoad],
  )

  const handleValueChange = (details: Combobox.ValueChangeDetails<SearchSelectOption>) => {
    const selectedValue = details.value[0]
    const selectedItem = details.items[0]
    if (selectedValue && selectedItem) {
      onChange?.(selectedValue, selectedItem)
    }
  }

  const handleOpenChange = (details: Combobox.OpenChangeDetails) => {
    if (details.open) {
      loadOptions("")
    }
  }

  const handleCreateClick = () => {
    setPendingName(inputValue)
    setIsConfirmOpen(true)
  }

  const handleConfirmCreate = async () => {
    if (!onCreate) return
    setIsCreating(true)
    try {
      const newOption = await onCreate(pendingName)
      onChange?.(newOption.value, newOption)
    } finally {
      setIsCreating(false)
      setIsConfirmOpen(false)
      setPendingName("")
    }
  }

  const handleCancelCreate = () => {
    setIsConfirmOpen(false)
    setPendingName("")
  }

  return (
    <>
      <Combobox.Root
        collection={collection}
        onInputValueChange={handleInputValueChange}
        onValueChange={handleValueChange}
        onOpenChange={handleOpenChange}
        value={value ? [value] : []}
        openOnClick
        size="sm"
        width="100%"
      >
        <Combobox.Control>
          <Combobox.Input placeholder={placeholder} />
          <Combobox.IndicatorGroup>
            <Combobox.ClearTrigger />
            <Combobox.Trigger />
          </Combobox.IndicatorGroup>
        </Combobox.Control>

        <Combobox.Positioner>
          <Combobox.Content>
            {isLoading ? (
              <Box p={3} textAlign="center">
                <Spinner size="sm" />
              </Box>
            ) : collection.items.length === 0 ? (
              onCreate && inputValue.trim() ? (
                <Box
                  px={3}
                  py={2}
                  cursor="pointer"
                  _hover={{ bg: "bg.emphasized" }}
                  onClick={handleCreateClick}
                >
                  <Text fontSize="sm" color="fg.muted">+ Новое значение</Text>
                </Box>
              ) : (
                <Text p={3} fontSize="sm" color="fg.muted" textAlign="center">
                  Ничего не найдено
                </Text>
              )
            ) : (
              collection.items.map((item) => (
                <Combobox.Item key={item.value} item={item}>
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
                </Combobox.Item>
              ))
            )}
          </Combobox.Content>
        </Combobox.Positioner>
      </Combobox.Root>

      <Dialog.Root open={isConfirmOpen} onOpenChange={(e) => { if (!e.open) handleCancelCreate() }} placement="center">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Создание нового значения</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text>
                  Создать новое значение <strong>{pendingName}</strong>?
                </Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="outline" onClick={handleCancelCreate}>Отменить</Button>
                <Button onClick={handleConfirmCreate} loading={isCreating}>Сохранить</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}

export default SearchSelect
