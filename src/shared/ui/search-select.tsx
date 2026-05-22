"use client"

import { Box, Input, Spinner, Text, VStack } from "@chakra-ui/react"
import { useCallback, useEffect, useRef, useState } from "react"

export type SearchSelectOption = {
  label: string
  value: string
}

type Props = {
  fetchOptions: (search: string) => Promise<SearchSelectOption[]>
  value?: string
  onChange?: (value: string, option: SearchSelectOption) => void
  placeholder?: string
  debounceMs?: number
}

const SearchSelect = ({
  fetchOptions,
  value,
  onChange,
  placeholder = "Выберите...",
  debounceMs = 400,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [options, setOptions] = useState<SearchSelectOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState("")

  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fetchRef = useRef(fetchOptions)
  fetchRef.current = fetchOptions

  const loadOptions = useCallback(async (query: string) => {
    setIsLoading(true)
    try {
      const result = await fetchRef.current(query)
      setOptions(result)
    } catch {
      setOptions([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return

    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      loadOptions(search)
    }, debounceMs)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [search, isOpen, debounceMs, loadOptions])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        if (!value) setSearch("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [value])

  useEffect(() => {
    if (!value) setSelectedLabel("")
  }, [value])

  const handleFocus = () => {
    setIsOpen(true)
    setSearch("")
  }

  const handleSelect = (option: SearchSelectOption) => {
    setSelectedLabel(option.label)
    setSearch("")
    setIsOpen(false)
    onChange?.(option.value, option)
  }

  return (
    <Box position="relative" width="100%" ref={containerRef}>
      <Input
        value={isOpen ? search : selectedLabel}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={handleFocus}
        placeholder={placeholder}
        size="sm"
      />
      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          zIndex={10}
          bg="bg"
          border="1px solid"
          borderColor="border"
          borderRadius="md"
          maxH="200px"
          overflowY="auto"
          mt={1}
          shadow="md"
        >
          {isLoading ? (
            <Box p={3} textAlign="center">
              <Spinner size="sm" />
            </Box>
          ) : options.length === 0 ? (
            <Text p={3} fontSize="sm" color="fg.muted" textAlign="center">
              Ничего не найдено
            </Text>
          ) : (
            <VStack gap={0} align="stretch">
              {options.map((option) => (
                <Box
                  key={option.value}
                  px={3}
                  py={2}
                  cursor="pointer"
                  _hover={{ bg: "bg.emphasized" }}
                  onClick={() => handleSelect(option)}
                  bg={value === option.value ? "bg.subtle" : undefined}
                >
                  <Text fontSize="sm">{option.label}</Text>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      )}
    </Box>
  )
}

export default SearchSelect
