import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import RedisCacheService from '@ioc:X/Services/RedisCache'
import { Rates } from 'App/Actions/UpdateRatesAction'

export default class Setting extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public key: string

  @column()
  public value: any

  @column()
  public isActive: boolean

  public static ratesCacheKey = '__rates'

  public static ratesKey = 'rates'

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * This is a database hook that ensure rates are saved
   * each time it's updated
   *
   * @param setting
   */
  @beforeSave()
  public static async cacheRates(setting: Setting) {
    if (setting.key === this.ratesKey) {
      await RedisCacheService.set(this.ratesCacheKey, setting.value)
    }
  }

  /**
   * Gets rates settings. This will attempt to get the rates
   * from the cache before hitting the database. We only
   * hit the database if we can't find from the cache
   * We also ensure we cache the rates afterwards
   *
   * @return Promise<Setting | object | null>
   */
  public static async forRates(): Promise<Rates | null> {
    const cachedValues = await RedisCacheService.get(this.ratesCacheKey)
    if (cachedValues) {
      return JSON.parse(cachedValues)
    }

    const rateSetting = await this.query().where('key', 'rates').first()
    if (rateSetting) {
      await RedisCacheService.set(this.ratesCacheKey, rateSetting.value)
    }

    const value = rateSetting?.value
    return JSON.parse(value ? value : '')
  }
}
