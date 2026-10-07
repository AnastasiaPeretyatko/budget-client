export type BaseSavingAccountType = {
  amount: string;
  description: string | null;
  name: string;
  // Резервный сейф: переводы на него видны на странице «План»
  isSafe?: boolean;
}

export type SavingAccountType = BaseSavingAccountType & {
  id: string;
  workspaceId: string;
  isSafe: boolean;
  createdAt: string;
  updatedAt: string;
  periodIncome: string;
  periodExpense: string;
  periodStartBalance: string;
  transactionCount: number;
  emoji?: string | null;
  workspaceName?: string | null;
}
