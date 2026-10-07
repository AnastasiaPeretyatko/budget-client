import { SavingAccountType } from '@/entities/saving-account';
import { CategoryType } from '@/entities/category';
import { TagType } from '@/entities/tag';
import { UserProfile } from '@/entities/user/types/user.type';
import { ParamsType } from '@/shared/types/params.type';

export type BaseTransactionType = {
  fromAccountId?: string;
  toAccountId?: string;
  categoryId?: string;
  tagIds?: string[];
  amount: string;
  description?: string | null;
  date: Date;
  type: TransactionTypeEnum;
}

// Тип для форм: дата хранится строкой 'YYYY-MM-DD' (так с ней работает BaseDatePicker),
// в Date её превращают уже при отправке на сервер.
export type TransactionFormType = Omit<BaseTransactionType, 'date'> & {
  date: string;
}

export type TransactionType = {
  id: string;
  fromAccount: SavingAccountType | null;
  toAccount?: SavingAccountType | null;
  category: CategoryType | null;
  tags?: TagType[];
  createdById: string | null;
  createdBy: UserProfile | null;
} & BaseTransactionType

export type BatchTransaction = {
  amount: string,
  date: Date,
  type: TransactionTypeEnum,
  description: string,
  accountName: string,
}

export enum TransactionTypeEnum {
  EXPENSE = 'expense',
  INCOME = 'income',
  TRANSFER = 'transfer',
}

export type TransactionParamsType = {
  accountId?: string,
  fromAccountId?: string,
  toAccountId?: string,
  type: TransactionTypeEnum | null
} & ParamsType

export type UpdateTransactionArgs = {
  id: string
  data: {
    fromAccountId?: string
    toAccountId?: string
    categoryId?: string
    tagIds?: string[]
    amount?: string
    description?: string | null
    date?: Date
    type?: TransactionTypeEnum
  }
}

export type GetAllTransactionResponse = {
  rows: TransactionType[]
  count: number
}

export type TagFilterOperator =
  | { eq: string }
  | { in: string[] }
  | { nin: string[] }
