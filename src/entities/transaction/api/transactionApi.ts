import { TemplateType } from '@/entities/template/types/template.type';
import { axiosBaseQuery } from '@/shared/api/axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { envelopesApi } from '@/entities/envelope/api/envelopesApi';
import { envelopeApi } from '@/entities/envelope/api/envelopApi';
import { statisticsApi } from '@/entities/statistics/api/statisticsApi';
import {
  BaseTransactionType,
  BatchTransaction,
  GetAllTransactionResponse,
  TagFilterOperator,
  TransactionType,
  UpdateTransactionArgs
} from '../types/transaction.type';

// Конверты и статистика лежат в других api (у каждого свой кэш), поэтому invalidatesTags отсюда
// их не затрагивает. После успешной мутации помечаем их устаревшими —
// RTK Query сам перезапросит те, что сейчас показаны на экране.
const refreshEnvelopes = async (
  _arg: unknown,
  { dispatch, queryFulfilled }: {
    dispatch: ThunkDispatch<unknown, unknown, UnknownAction>;
    queryFulfilled: Promise<unknown>;
  },
) => {
  try {
    await queryFulfilled
    dispatch(envelopesApi.util.invalidateTags(['Envelopes']))
    dispatch(envelopeApi.util.invalidateTags(['Envelope']))
    dispatch(statisticsApi.util.invalidateTags(['Statistics']))
  } catch {
    // запрос не удался — остатки не менялись, обновлять нечего
  }
}

export type GetAllTransactionArgs = {
  paging?: {
    limit?: number;
    offset?: number;
  };
  filter?: {
    fromAccountId?: string;
    toAccountId?: string;
    categoryIds?: string[];
    accountId?: string;
    date?: { between: string[] };
    type?: string | null;
    tag?: TagFilterOperator;
    periodId?: string;
  };
  search?: string
};

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  tagTypes: ['Transaction'],
  baseQuery: axiosBaseQuery(),
  endpoints: build => ({
    getTransaction: build.query<
    GetAllTransactionResponse,
    Partial<GetAllTransactionArgs>>({
      query: data => ({ url: 'transition/all', method: 'POST', data }),
      providesTags: (result) => result?.rows
        ? [
          ...result.rows.map(({ id }) => ({ type: 'Transaction' as const, id })),
          { type: 'Transaction', id: 'LIST' },
        ]
        : [{ type: 'Transaction', id: 'LIST' }],
    }),
    addTransactionFromTemplate: build.mutation<TransactionType,
    {templateId: string, overrides: Partial<TemplateType>}>({
      query: (data) => ({ url: 'transition/from-template', method:'POST', data }),
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
      onQueryStarted: refreshEnvelopes,
    }),
    addTransactionsBatch: build.mutation<TransactionType[], BatchTransaction[]>({
      query: (data) => ({ url: 'transition/batch', method:'POST', data }),
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
      onQueryStarted: refreshEnvelopes,
    }),
    addTransaction: build.mutation<TransactionType, BaseTransactionType>({
      query: (data) => ({ url: 'transition', method:'POST', data }),
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
      onQueryStarted: refreshEnvelopes,
    }),
    deleteTransaction: build.mutation<void, string>({
      query: (id) => ({ url: `transition/${id}`, method:'DELETE' }),
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
      onQueryStarted: refreshEnvelopes,
    }),
    editTransaction: build.mutation<TransactionType, {id: string, data: UpdateTransactionArgs['data']}>({
      query: ({ id, data }) => ({ url: `transition/${id}`, method:'PATCH', data }),
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
      onQueryStarted: refreshEnvelopes,
    }),
  })
})

export const {
  useAddTransactionFromTemplateMutation,
  useAddTransactionMutation,
  useAddTransactionsBatchMutation,
  useGetTransactionQuery,
  useDeleteTransactionMutation,
  useEditTransactionMutation
} = transactionApi
