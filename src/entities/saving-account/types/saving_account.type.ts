export type BaseSavingAccountType = {
  amount: string;
  description: string | null;
  name: string;
}

export type SavingAccountType = BaseSavingAccountType & {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  spend: string;
  remaining: string;
  transactionCount: number
}
