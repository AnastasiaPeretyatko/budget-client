import { SavingAccountType } from '@/entities/saving-account/types/saving_account.type';

export type BaseTransactionType = {
  fromAccountId?: string;
  toAccountId?: string;
  categoryId?: string;
  amount: string;
  description?: null;
  date: Date;
}

export type TransactionType = {
  id: string;
  fromAccount: SavingAccountType | null;
  toAccount?: SavingAccountType | null;
} & BaseTransactionType