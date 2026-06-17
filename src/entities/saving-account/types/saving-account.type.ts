export type BaseSavingAccountType = {
  amount: string;
  description: string | null;
  name: string;
}

export type SavingAccountType = BaseSavingAccountType & {
  id: string;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
  periodIncome: string;
  periodExpense: string;
  periodStartBalance: string;
  transactionCount: number;
  emoji?: string | null;
  workspaceName?: string | null;
}
