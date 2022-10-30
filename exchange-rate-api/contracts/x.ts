declare module '@ioc:X/Core/Config' {
  type KrakenConfig = {
    api_key: string
    api_secret: string
    timeout: number | undefined
    pairs: Array<string>
  }

  export interface AppConfig {
    kraken: KrakenConfig
  }
}
