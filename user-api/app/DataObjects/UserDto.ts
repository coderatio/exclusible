import { DateTime } from 'luxon'

export default class UserDto {
  public firstName: string
  public lastName: string
  public email: string
  public emailVerifiedAt?: DateTime
  public createdAt?: DateTime
}
