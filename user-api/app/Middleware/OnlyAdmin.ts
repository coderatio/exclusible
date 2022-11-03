import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Response from 'App/Supports/Response'

export default class OnlyAdmin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    await auth.check()

    const user: any = auth.user
    if (user.role !== 'admin') {
      return new Response(response).unauthorized('Unauthorized access')
    }

    await next()
  }
}
