import { Role } from 'App/Models/User'

export default class UserDto {
  public firstName: string
  public lastName: string
  public role: Role
  public email: string
  public emailVerifiedAt?: Date
}
