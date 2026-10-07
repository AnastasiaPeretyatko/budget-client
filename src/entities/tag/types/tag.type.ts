export type TagType = {
  id: string
  name: string
  color: string
  workspaceId: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type TagWithStatsType = TagType & {
  transactionCount: number
  periodAmount: string | null
  periodDays: number | null
}

export type CreateTagDto = {
  name: string
  color: string
}

export type UpdateTagDto = {
  name?: string
  color?: string
}

export type GetTagsParams = {
  search?: string
  periodId?: string
  sort?: 'usage' | 'name' | 'created'
}

export type MergeTagsDto = {
  sourceIds: string[]
  targetId: string
}

export type MergeTagsResponse = {
  tag: TagWithStatsType
  movedTransactions: number
  mergedTags: number
}

export type CleanupTagsResponse = {
  deletedCount: number
  deletedIds: string[]
}
