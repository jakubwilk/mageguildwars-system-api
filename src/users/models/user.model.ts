export enum UserGroupEnum {
  BANNED,
  USER,
  OPERATOR,
  ROOT,
}

export interface ICreateUser {
  email: string
  password: string
}
