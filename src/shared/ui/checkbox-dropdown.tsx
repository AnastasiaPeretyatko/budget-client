"use client"

import {
  Box,
  Button,
  Checkbox,
  HStack,
  Popover,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react"
import { LuChevronDown, LuChevronUp } from "react-icons/lu"
import { useState } from "react"
import { COLOR } from "@/shared/config/colors"

export type CheckboxDropdownItem = {
  label: string
  value: string
  color?: string
}

export type ItemFilterState = "included" | "excluded" | undefined
export type CheckboxDropdownValue = Record<string, ItemFilterState>

type Props = {
  label: string
  items: CheckboxDropdownItem[]
  value: CheckboxDropdownValue
  onChange: (value: CheckboxDropdownValue) => void
  allLabel?: string
}

function nextState(current: ItemFilterState): ItemFilterState {
  if (!current) return "included"
  if (current === "included") return "excluded"
  return undefined
}

function itemChecked(state: ItemFilterState): boolean | "indeterminate" {
  if (state === "included") return true
  if (state === "excluded") return "indeterminate"
  return false
}

const CheckboxDropdown = ({ label, items, value, onChange, allLabel = "Все" }: Props) => {
  const [draft, setDraft] = useState<CheckboxDropdownValue>(value)
  const [open, setOpen] = useState(false)

  const handleOpenChange = (details: { open: boolean }) => {
    if (details.open) {
      setDraft(value)
    }
    setOpen(details.open)
  }

  const handleToggleItem = (id: string) => {
    setDraft(prev => ({ ...prev, [id]: nextState(prev[id]) }))
  }

  const handleClear = () => setDraft({})

  const handleApply = () => {
    onChange(draft)
    setOpen(false)
  }

  const activeCount = Object.values(value).filter(Boolean).length

  const triggerLabel = () => {
    if (activeCount === 0) return allLabel
    if (activeCount === 1) {
      const id = Object.keys(value).find(k => value[k])!
      const item = items.find(i => i.value === id)
      return value[id] === "excluded" ? `не: ${item?.label}` : item?.label ?? allLabel
    }
    const inc = Object.values(value).filter(s => s === "included").length
    const exc = Object.values(value).filter(s => s === "excluded").length
    const parts: string[] = []
    if (inc > 0) parts.push(`+${inc}`)
    if (exc > 0) parts.push(`-${exc}`)
    return parts.join(" / ")
  }

  const draftCount = Object.values(draft).filter(Boolean).length

  return (
    <Popover.Root
      open={open}
      onOpenChange={handleOpenChange}
      lazyMount
      unmountOnExit
      positioning={{ placement: "bottom-start" }}
    >
      <Popover.Trigger asChild>
        <Button
          size="xs"
          variant="outline"
          borderRadius="full"
          fontSize="xs"
          borderColor={activeCount > 0 ? "blue.500" : COLOR.BORDER}
          color={activeCount > 0 ? "blue.400" : undefined}
          gap={1}
          px={3}
        >
          <Text color={COLOR.LABEL} fontSize="xs" fontWeight={400}>{label}:</Text>
          {triggerLabel()}
          {open ? <LuChevronUp size={12} /> : <LuChevronDown size={12} />}
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            width="240px"
            p={2}
            borderColor={COLOR.BORDER}
            borderRadius={12}
            boxShadow="lg"
          >
            <VStack align="stretch" gap={0}>
              {items.length === 0 && (
                <Text fontSize="sm" color={COLOR.LABEL} px={3} py={2}>
                  Нет тегов
                </Text>
              )}

              {items.map(item => {
                const state = draft[item.value]
                return (
                  <HStack
                    key={item.value}
                    px={3}
                    py={2}
                    borderRadius={8}
                    cursor="pointer"
                    _hover={{ bg: "gray.800" }}
                    gap={3}
                    onClick={() => handleToggleItem(item.value)}
                  >
                    <Checkbox.Root
                      checked={itemChecked(state)}
                      colorPalette={state === "excluded" ? "red" : "blue"}
                      size="sm"
                      pointerEvents="none"
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox.Root>
                    <HStack gap={2} flex={1} minW={0}>
                      {item.color && (
                        <Box
                          w="10px"
                          h="10px"
                          borderRadius="full"
                          flexShrink={0}
                          style={{ backgroundColor: item.color }}
                        />
                      )}
                      <Text fontSize="sm" lineClamp={1}>{item.label}</Text>
                    </HStack>
                  </HStack>
                )
              })}

              <Box height="1px" bg={COLOR.BORDER} mx={1} mt={1} mb={2} />

              <HStack px={1} gap={2}>
                <Button
                  size="xs"
                  variant="ghost"
                  colorPalette="gray"
                  flex={1}
                  onClick={handleClear}
                  disabled={draftCount === 0}
                >
                  Сбросить
                </Button>
                <Button
                  size="xs"
                  variant="solid"
                  colorPalette="blue"
                  flex={1}
                  onClick={handleApply}
                >
                  Применить
                </Button>
              </HStack>
            </VStack>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}

export default CheckboxDropdown
