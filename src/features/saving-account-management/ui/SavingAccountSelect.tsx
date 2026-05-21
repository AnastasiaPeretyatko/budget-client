import { RootState } from '@/app/store'
import BaseSelect from '@/shared/ui/select'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

type Props = {
  onChange: (value: string) => void
  placeholder?: string
  maxWidth?: string
  value?: string
}

const SavingAccountSelect = (props: Props) => {
  const { savingAccounts } = useSelector((state: RootState) => state.savingAccounts)

  const options = useMemo(() => {
    if (!savingAccounts) return []
    return savingAccounts.map((account) => ({
      label: account.name,
      value: account.id
    }))
  }, [savingAccounts])

  return (
    <BaseSelect options={options} {...props}/>
  )
}

export default SavingAccountSelect
