declare module '@ioc:X/Core/Config' {
  export type AuthConfig = {
    expiredIn: string
  }

  export interface AppConfig {
    auth: AuthConfig
  }
}
