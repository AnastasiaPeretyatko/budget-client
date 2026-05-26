"use client"

import { DatePicker, parseDate, Portal } from "@chakra-ui/react"
import { useState } from 'react'
import { LuCalendar } from "react-icons/lu"

type Props = {
  selectionMode: "single" | "multiple" | "range"
  label?: string;
  defaultDate?: string
  onChangeValue: (dates: string[]) => void
}

const BaseDatePicker = ({ selectionMode, label, defaultDate, onChangeValue }: Props) => {
  const [value, setValue] = useState([parseDate(defaultDate || new Date())])

  const handleChengeDate = (e: DatePicker.ValueChangeDetails) => {
    setValue(e.value)
    onChangeValue(e.value.map(d => d.toString()))
  }

  return (
    <DatePicker.Root selectionMode={selectionMode} maxWidth="20rem" value={value} onValueChange={handleChengeDate}>
      {label && <DatePicker.Label>{label}</DatePicker.Label>}
      <DatePicker.Control>
        <DatePicker.Input index={0} />
        <DatePicker.Input index={1} />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

export default BaseDatePicker
