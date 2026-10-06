import { CategoryType } from '@/entities/category';
import { SavingAccountType } from '@/entities/saving-account';
import { TransactionTypeEnum } from '@/entities/transaction';
import { IconName } from '@/shared/ui/icon-picker';

export type BaseTemplateType = {
  icon: IconName;
  name: string;
  fromAccountId?: string;
  toAccountId?: string;
  categoryId?: string;
  tagIds?: string[];
  amount: string;
  description?: string | null;
  type: TransactionTypeEnum;
}

export type TemplateType = {
  id: string;
  fromAccount: SavingAccountType | null;
  toAccount?: SavingAccountType | null;
  category: CategoryType | null;
  // tags?: TagType[];

} & BaseTemplateType
