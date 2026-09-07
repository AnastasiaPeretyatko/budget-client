import { TransactionTypeEnum } from '@/entities/transaction'
import { BatchTransaction } from '@/entities/transaction/types/transaction.type'

const parseLineToTransaction = (line: string): BatchTransaction => {
  const [description, amount, , account] = line.trim().split(' ')

  return {
    amount, // ⚠️ если BatchTransaction.amount — number, тут нужно Number(amount)
    date: new Date(),
    type: TransactionTypeEnum.EXPENSE,
    description,
    accountName: account,
  }
}
export default parseLineToTransaction;
