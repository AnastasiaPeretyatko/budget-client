import { TransactionTypeEnum } from '@/entities/transaction';
import { COLOR } from '@/shared/config/colors';

export const TYPE_CONFIG = {
  [TransactionTypeEnum.EXPENSE]: { label: 'Расход', palette: 'red', color: COLOR.DANGER_TEXT, sign: '-' },
  [TransactionTypeEnum.INCOME]: { label: 'Доход', palette: 'green', color: COLOR.INCOME_TEXT, sign: '+' },
  [TransactionTypeEnum.TRANSFER]: { label: 'Перевод', palette: 'blue', color: COLOR.PERIOD_TEXT, sign: '' },
} as const
