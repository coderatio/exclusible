/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for the majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import KrakenService from 'App/Services/kraken.service'
import CURRENCY from 'App/Constants/Currencies'
import Response from 'App/Supports/Response'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.get('/rates/:currency', async ({ request, response }) => {
  const param: string = request.param('currency')
  const pair = CURRENCY[param]
  const res = new Response(response)

  if (!pair) {
    return res.failed('Invalid pair!')
  }

  const kraken: any = await KrakenService.init().ticker({ pair })

  const value = kraken[pair].a[0] ? kraken[pair].a[0] : 'N/A'
  return res.success(`Current rate for ${param}`, {
    pair: param,
    rate: value,
  })
})
