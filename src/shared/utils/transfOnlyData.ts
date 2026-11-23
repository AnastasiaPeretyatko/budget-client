type DataType = {
  [k: string]: number | string | boolean | null
}

type KeyDataType = {
  [k: string]: boolean
}

export function transfOnlyData<T extends DataType>(keys: KeyDataType, data: T) {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) =>
      keys[key as keyof DataType]
    )
  )
}
