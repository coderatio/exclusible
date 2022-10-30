import { Kraken } from 'node-kraken-api'
import { x } from 'Config/x'

export default class KrakenService {
  public static async tick() {
    const instance = this.init()

    await instance.ws
      .ticker()
      .on('update', async (payload: Kraken.WS.Ticker, pair: string) => {
        console.log(payload)

        console.log(`Received new rates for ${pair.replace('XBT', 'BTC')}`)
      })
      .on('error', (error, pair) => console.log({ error, pair }))
      .subscribe('XBT/USD')
  }

  private static init(options?: object) {
    return new Kraken({
      /** REST API key. */
      key: x.kraken.api_key,
      /** REST API secret. */
      secret: x.kraken.api_secret,
      /** Connection timeout (default 1000). */
      timeout: <number>(<unknown>x.kraken.timeout),
      ...options,
    })
  }
}
