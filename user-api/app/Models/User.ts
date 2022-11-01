import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import * as crypto from 'crypto'

export type Role = 'admin' | 'user'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public role: Role

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public passwordSalt: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      const salt = crypto.randomBytes(16).toString('hex')

      user.passwordSalt = salt
      user.password = await Hash.make(salt + user.password)
    }
  }
}
