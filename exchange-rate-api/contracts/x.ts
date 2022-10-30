declare module '@ioc:X/Core/Config' {
  import { Kraken } from 'node-kraken-api'
  type KrakenConfig = {
    api_key: string
    api_secret: string
    timeout: number | undefined
    pairs: Array<string>
  }

  type RedisConfig = {
    rates_channel: string
  }

  export interface KrakenPayload {
    payload: Kraken.WS.Ticker
    pair: string
  }

  export interface AppConfig {
    kraken: KrakenConfig
    redis: RedisConfig
  }
}
