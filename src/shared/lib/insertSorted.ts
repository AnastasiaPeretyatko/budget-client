export const insertSortedByDate = <T>(
  list: T[],
  item: T,
  getDate: (item: T) => string | Date
): void => {
  const newDate = new Date(getDate(item)).getTime()
  const idx = list.findIndex(t => new Date(getDate(t)).getTime() <= newDate)

  if (idx === -1) {
    list.push(item)
  } else {
    list.splice(idx, 0, item)
  }
}
