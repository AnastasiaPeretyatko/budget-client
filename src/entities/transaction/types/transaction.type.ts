import { SavingAccountType } from '@/entities/saving-account';

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
} & BaseTransactionType
