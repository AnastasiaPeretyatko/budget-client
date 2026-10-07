"use client"

import { Combobox, createListCollection, Field, HStack, Portal, Spinner, Tag } from "@chakra-ui/react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { getAllTagsRequest } from "@/entities/tag"
import { useAsyncOptions } from "@/shared/utils/useAsyncOptions"

export type TagSelectOption = {
  label: string
  value: string
  color: string
}

type Props = {
  defaultSelected?: TagSelectOption[]
  onChange?: (ids: string[], tags: TagSelectOption[]) => void
  label?: string
  placeholder?: string
}

const TagSelectInput = ({ defaultSelected = [], onChange, label, placeholder = 'Выберите теги...' }: Props) => {
  const fetchTags = useCallback(async (search: string): Promise<TagSelectOption[]> => {
    const res = await getAllTagsRequest(search || undefined)
    return res.data.map(t => ({ label: t.name, value: t.id, color: t.color }))
  }, [])

  const { options, isLoading, setSearch } = useAsyncOptions(fetchTags, 300)
  const [selected, setSelected] = useState<TagSelectOption[]>(defaultSelected)

  // Запоминаем все теги, которые уже видели: после нового поиска выбранного тега
  // может не быть в текущем списке, а название и цвет для «чипа» всё равно нужны.
  const knownRef = useRef(new Map<string, TagSelectOption>(defaultSelected.map(t => [t.value, t])))
  useEffect(() => {
    options.forEach(t => knownRef.current.set(t.value, t))
  }, [options])

  const collection = useMemo(() => createListCollection({ items: options }), [options])

  const updateSelected = (next: TagSelectOption[]) => {
    setSelected(next)
    onChange?.(next.map(t => t.value), next)
  }

  const removeTag = (id: string) => updateSelected(selected.filter(t => t.value !== id))

  const handleValueChange = ({ value }: Combobox.ValueChangeDetails<TagSelectOption>) => {
    updateSelected(value.flatMap(id => knownRef.current.get(id) ?? []))
  }

  const handleInputValueChange = ({ inputValue, reason }: Combobox.InputValueChangeDetails) => {
    if (reason === 'input-change') setSearch(inputValue)
    // после выбора тега поле очищается — возвращаем полный список
    if (reason === 'item-select' || reason === 'clear-trigger') setSearch('')
  }

  return (
    <Field.Root width="100%">
      <Combobox.Root
        multiple
        variant="primary"
        collection={collection}
        value={selected.map(t => t.value)}
        onValueChange={handleValueChange}
        onInputValueChange={handleInputValueChange}
        selectionBehavior="clear"
        closeOnSelect={false}
        openOnClick
      >
        {label && <Combobox.Label>{label}</Combobox.Label>}
        {selected.length > 0 && (
          <HStack wrap="wrap" gap={1}>
            {selected.map(tag => (
              <Tag.Root
                key={tag.value}
                bg={tag.color + '30'}
                color={tag.color}
                border={`1px solid ${tag.color}60`}
                boxShadow="none"
              >
                <Tag.Label fontWeight={600}>{tag.label}</Tag.Label>
                <Tag.EndElement>
                  <Tag.CloseTrigger onClick={() => removeTag(tag.value)} />
                </Tag.EndElement>
              </Tag.Root>
            ))}
          </HStack>
        )}
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
              <Combobox.Empty>Теги не найдены</Combobox.Empty>
              {collection.items.map(item => (
                <Combobox.Item item={item} key={item.value}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: item.color,
                      flexShrink: 0,
                    }}
                  />
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
    </Field.Root>
  )
}

export default TagSelectInput
