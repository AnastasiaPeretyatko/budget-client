export type TagType = {
  id: string
  name: string
  color: string
  workspaceId: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type CreateTagDto = {
  name: string
  color: string
}

export type UpdateTagDto = {
  name?: string
  color?: string
}
