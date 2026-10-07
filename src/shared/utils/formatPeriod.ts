import moment from 'moment'

const SHORT_MONTHS = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']

const formatDay = (date: moment.Moment) => `${date.date()} ${SHORT_MONTHS[date.month()]}`

// "7 авг 2024"
export const formatDate = (value: string) => {
  const date = moment(value)
  return `${formatDay(date)} ${date.year()}`
}

const formatPeriod = (startDate: string, endDate: string) => {
  const start = moment(startDate)
  const end = moment(endDate)
  const days = end.clone().startOf('day').diff(start.clone().startOf('day'), 'days') + 1
  return `${formatDay(start)} — ${formatDay(end)} (${days} дн.)`
}

export default formatPeriod;
