import { AppConfig } from '@ioc:X/Core/Config'
import Env from '@ioc:Adonis/Core/Env'

export const availablePairs: Array<string> = ['XBT/USD']

export const x: AppConfig = {
  kraken: {
    api_key: Env.get('KRAKEN_API_KEY') as string,
    api_secret: Env.get('KRAKEN_API_SECRET') as string,
    timeout: Number(Env.get('KRAKEN_TIMEOUT', '1000')),
    pairs: availablePairs,
  },
}
