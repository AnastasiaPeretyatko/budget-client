import { TransactionTypeEnum } from '@/entities/transaction'

export function generateTransactionType(
  fromAccountId?: string, toAccountId?: string
):TransactionTypeEnum {
  if (fromAccountId && toAccountId) {
    return TransactionTypeEnum.TRANSFER
  }

  if (fromAccountId && !toAccountId) {
    return TransactionTypeEnum.EXPENSE
  }

  if (!fromAccountId && toAccountId) {
    return TransactionTypeEnum.INCOME
  }

  return TransactionTypeEnum.EXPENSE
}
