import { AppConfig } from '@ioc:X/Core/Config'
import Env from '@ioc:Adonis/Core/Env'

const ratePairs = Env.get('AVAILABLE_PAIRS') as string
export const availablePairs: Array<string> = ratePairs.split(',')

export const x: AppConfig = {
  kraken: {
    api_key: Env.get('KRAKEN_API_KEY') as string,
    api_secret: Env.get('KRAKEN_API_SECRET') as string,
    timeout: Number(Env.get('KRAKEN_TIMEOUT', '1000')),
    pairs: availablePairs,
  },

  redis: {
    rates_channel: Env.get('REDIS_RATE_CHANNEL') as string,
  },
}
