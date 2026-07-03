import { SavingAccountType } from '@/entities/saving-account';
import { CategoryType } from '@/entities/category';
import { TagType } from '@/entities/tag';
import { UserProfile } from '@/entities/user/types/user.type';

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

export type TransactionType = {
  id: string;
  fromAccount: SavingAccountType | null;
  toAccount?: SavingAccountType | null;
  category?: CategoryType | null;
  tags?: TagType[];
  createdById: string | null;
  createdBy: UserProfile | null;
  type: TransactionTypeEnum;
} & BaseTransactionType

export enum TransactionTypeEnum {
  EXPENSE = 'expense',
  INCOME = 'income',
  TRANSFER = 'transfer',
}
