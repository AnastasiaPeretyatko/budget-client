import type { AppDispatch } from './store'
import { templatesApi } from '@/entities/template/api/templatesApi'
import { transactionApi } from '@/entities/transaction/api/transactionApi'
import { envelopesApi } from '@/entities/envelope/api/envelopesApi'
import { envelopeApi } from '@/entities/envelope/api/envelopApi'
import { billingPeriodApi } from '@/entities/billing-period/api/billing-periodApi'
import { categoriesApi } from '@/entities/category/api/categoriesApi'
import { tagsApi } from '@/entities/tag/api/tagsApi'
import { statisticsApi } from '@/entities/statistics/api/statisticsApi'
import { userApi } from '@/entities/user/api/userApi'
import { workspaceApi } from '@/entities/workspace/api/workspaceApi'

const apis = [
  templatesApi,
  transactionApi,
  envelopesApi,
  envelopeApi,
  billingPeriodApi,
  categoriesApi,
  tagsApi,
  statisticsApi,
  userApi,
  workspaceApi
]

// Данные в кэше относятся к конкретному рабочему пространству и пользователю.
// Вызывать при смене пространства и при выходе: dispatch(resetApiCache())
export const resetApiCache = () => (dispatch: AppDispatch) => {
  apis.forEach(api => dispatch(api.util.resetApiState()))
}
