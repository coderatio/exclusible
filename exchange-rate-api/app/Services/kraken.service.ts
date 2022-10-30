import { Kraken } from 'node-kraken-api'
import { availablePairs, x } from 'Config/x'
import Redis from '@ioc:Adonis/Addons/Redis'
import Logger from '@ioc:Adonis/Core/Logger'

export default class KrakenService {
  public static async run(): Promise<void> {
    const instance = this.init()

    await instance.ws
      .ticker()
      .on('update', async (payload: Kraken.WS.Ticker, pair: string) => {
        await KrakenService.toRedisPubSub(payload, pair)
      })
      .on('error', (error, pair) => Logger.error('Kraken Error:', { error, pair }))
      .subscribe(...availablePairs)
  }

  private static async toRedisPubSub(payload: Kraken.WS.Ticker, pair: string): Promise<void> {
    await Redis.publish(
      x.redis.ratesChannel,
      JSON.stringify({
        data: payload,
        pair,
      })
    )
  }

  private static init(options?: object): Kraken {
    return new Kraken({
      /** REST API key. */
      key: x.kraken.apiKey,
      /** REST API secret. */
      secret: x.kraken.apiSecret,
      /** Connection timeout (default 1000). */
      timeout: <number>(<unknown>x.kraken.timeout),
      ...options,
    })
  }
}
