declare module '@ioc:X/Services/RedisCache' {
  import RedisCacheService from 'App/Services/RedisCacheService'
  export interface EngineInterface {
    get(name: string): Promise<any>
    set(name: string, data: any, duration?: number): Promise<any>
    delete(name: String): Promise<Boolean>
    flush(): Promise<void>
  }

  /** @ts-ignore **/
  const RedisCache: EngineInterface = new RedisCacheService()

  export default RedisCache
}
