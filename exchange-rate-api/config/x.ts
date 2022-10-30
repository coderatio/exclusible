import { AppConfig } from '@ioc:X/Core/Config'
import Env from '@ioc:Adonis/Core/Env'

const ratePairs = Env.get('AVAILABLE_PAIRS') as string
export const availablePairs: Array<string> = ratePairs.split(',')

export const x: AppConfig = {
  kraken: {
    apiKey: Env.get('KRAKEN_API_KEY') as string,
    apiSecret: Env.get('KRAKEN_API_SECRET') as string,
    timeout: Number(Env.get('KRAKEN_TIMEOUT', '1000')),
    pairs: availablePairs,
  },

  redis: {
    ratesChannel: Env.get('REDIS_RATE_CHANNEL') as string,
  },
}
