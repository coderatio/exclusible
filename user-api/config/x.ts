import { AppConfig } from '@ioc:X/Core/Config'
import Env from '@ioc:Adonis/Core/Env'

const x: AppConfig = {
  auth: {
    expiredIn: Env.get('TOKEN_EXPIRED_AT', '1440 mins'),
  },
}

export default x
