export type BaseUserType = {
  id: string;
  email: string
}

export type UserProfile = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type UpdateUserDto = {
  firstName?: string;
  lastName?: string;
}
