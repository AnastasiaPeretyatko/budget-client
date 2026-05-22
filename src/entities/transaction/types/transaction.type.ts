import { SavingAccountType } from '@/entities/saving-account';
import { CategoryType } from '@/entities/category';

export type BaseTransactionType = {
  fromAccountId?: string;
  toAccountId?: string;
  categoryId?: string;
  amount: string;
  description?: string | null;
  date: Date;
  workspaceId: string;
}

export type TransactionType = {
  id: string;
  fromAccount: SavingAccountType | null;
  toAccount?: SavingAccountType | null;
  category?: CategoryType | null;
} & BaseTransactionType
