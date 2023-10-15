export enum UsersTableHeadersKeys {
  ID = 'id',
  NAME = 'name',
  EMAIL = 'email',
  AVATAR = 'avatar',
  ROLE = 'role',
  IS_SUSPENDED = 'isSuspended',
  IS_ANONYMOUS = 'isAnonymous',
}

export type UserFormDialogState =
  | {
      state: 'open'
      userId?: string
    }
  | { state: 'loading' }
  | { state: 'closed' }
