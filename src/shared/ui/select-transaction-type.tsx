import { TransactionTypeEnum } from '@/entities/transaction'
import BaseSelect from './select';

type Props = {
  type: TransactionTypeEnum;
  setType: (type: TransactionTypeEnum) => void;
}

const SelectTransactionType = ({ type, setType }: Props) => {
  const options = Object.entries(TransactionTypeEnum).map(([label, value]) => ({
    label,
    value,
  }));

  return (
    <BaseSelect
      options={options}
      value={type}
      onChange={(type) => setType(type as TransactionTypeEnum)}
    />
  )
}

export default SelectTransactionType
