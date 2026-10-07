export type BaseEnvelopesType = {
  amount: string;
  description: string | null;
  name: string;
  isSafe?: boolean;
}

export type EnvelopesType = BaseEnvelopesType & {
  id: string;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  periodIncome: string;
  periodExpense: string;
  periodStartBalance: string;
  transactionCount: number;
  isSafe: boolean;
  emoji?: string | null;
  workspaceName?: string | null;

}
