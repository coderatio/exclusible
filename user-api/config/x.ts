import { AppConfig } from '@ioc:X/Core/Config'
import Env from '@ioc:Adonis/Core/Env'

const x: AppConfig = {
  auth: {
    expiresIn: Env.get('TOKEN_EXPIRED_AT', '1440 mins'),
  },
  redis: {
    ratesChannel: Env.get('REDIS_RATE_CHANNEL', 'rates:latest'),
  },
}

export default x
