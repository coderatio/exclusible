declare module '@ioc:X/Core/Config' {
  import { Kraken } from 'node-kraken-api'
  type KrakenConfig = {
    apiKey: string
    apiSecret: string
    timeout: number | undefined
    pairs: Array<string>
  }

  type RedisConfig = {
    ratesChannel: string
  }

  export interface KrakenPayload {
    data: Kraken.WS.Ticker
    pair: string
  }

  export interface AppConfig {
    kraken: KrakenConfig
    redis: RedisConfig
  }
}
