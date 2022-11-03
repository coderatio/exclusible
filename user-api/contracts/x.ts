declare module '@ioc:X/Core/Config' {
  export type AuthConfig = {
    expiresIn: string
  }

  type RedisConfig = {
    ratesChannel: string
  }

  export interface AppConfig {
    auth: AuthConfig
    redis: RedisConfig
  }
}
