import { SavingAccountType } from '@/entities/saving-account';
import { CategoryType } from '@/entities/category';
import { BaseUserType } from '@/entities/user/types/user.type';

export type BaseTransactionType = {
  fromAccountId?: string;
  toAccountId?: string;
  categoryId?: string;
  amount: string;
  description?: string | null;
  date: Date;
  type: TransactionTypeEnum;
}

export type TransactionType = {
  id: string;
  fromAccount: SavingAccountType | null;
  toAccount?: SavingAccountType | null;
  category?: CategoryType | null;
  createdById: string | null;
  createdBy: BaseUserType | null;
  type: TransactionTypeEnum;
} & BaseTransactionType

export enum TransactionTypeEnum {
  EXPENSE = 'expense',
  INCOME = 'income',
  TRANSFER = 'transfer',
}
