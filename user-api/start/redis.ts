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
import x from 'Config/x'
import Setting from 'App/Models/Setting'
import { Rates } from 'App/Actions/UpdateRatesAction'

Redis.subscribe(x.redis.ratesChannel, async (result: string) => {
  if (!result) {
    return
  }

  const payload = JSON.parse(result)
  const exchangeRate = parseInt(payload.data.a[0])

  const rates: Rates = {
    buy: exchangeRate,
    sell: exchangeRate,
  }

  const ratesSetting: any = await Setting.forRates()
  if (ratesSetting.buy) {
    rates.buy = parseInt(ratesSetting.buy) + exchangeRate
    rates.sell = parseInt(ratesSetting.sell) + exchangeRate
  }

  // Broadcast new rate to socket clients
  const socketPayload = {
    BTC_USD: {
      original: {
        buy: exchangeRate,
        sell: exchangeRate,
      },
      withSpread: rates,
      currentSpread: ratesSetting ? ratesSetting : undefined,
    },
  }

  console.log(socketPayload)
})
