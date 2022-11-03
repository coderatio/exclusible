import UpdateRatesAction from 'App/Actions/UpdateRatesAction'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SettingsController {
  public async updateRates({ request, response }: HttpContextContract): Promise<object> {
    return await UpdateRatesAction.execute(request, response)
  }
}
