/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Redis from '@ioc:Adonis/Addons/Redis'
import { x } from 'Config/x'
import { KrakenPayload } from '@ioc:X/Core/Config'

Redis.subscribe(x.redis.rates_channel, (result: string) => {
  const message: KrakenPayload = JSON.parse(result)
  const date = new Date()

  console.log(
    // @ts-ignore
    `Received new rates(${message.payload.a[0]}) for ${message.pair.replace(
      'XBT',
      'BTC'
    )} at ${date.toUTCString()}`
  )
})
