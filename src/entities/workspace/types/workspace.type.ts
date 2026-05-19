export type BaseWorkspaceType = {
  title: string
}

export type WorkspaceType = BaseWorkspaceType & {
  id: string
  ownerId: string
  owner: {
    id: string
    email: string
    createdAt: string
  }
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type WorkspaceListType = WorkspaceType & {
  userCount: number
}
