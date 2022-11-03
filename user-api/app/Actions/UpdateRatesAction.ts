import Setting from 'App/Models/Setting'
import Response from 'App/Supports/Response'
import { schema } from '@ioc:Adonis/Core/Validator'

export type Rates = {
  buy: number
  sell: number
}

export default class UpdateRatesAction {
  public static async execute(request, response): Promise<object> {
    const validated = await this.validate(request)
    const setting = await Setting.findBy('key', Setting.ratesKey)

    if (setting instanceof Setting) {
      setting.value = JSON.stringify(validated)
      await setting.save()

      // Fire admin - [updated rates] event
      return new Response(response).success('Rates updated')
    }

    await Setting.create({
      key: Setting.ratesKey,
      value: JSON.stringify(validated),
    })

    // Fire admin - [updated rates] event
    return new Response(response).success('Rates created')
  }

  private static async validate(request): Promise<Rates> {
    return await request.validate({
      schema: schema.create({
        buy: schema.number(),
        sell: schema.number(),
      }),
      messages: {
        'buy.required': 'The buy field is required',
        'buy.minLength': 'The buy value must be greater than 0',
        'buy.number': 'The buy value must be a number',
        'sell.required': 'The sell field is required',
        'sell.minLength': 'The sell value must be greater than 0',
        'sell.number': 'The sell value must be a number',
      },
    })
  }
}
