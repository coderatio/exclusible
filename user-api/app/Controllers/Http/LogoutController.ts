import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Response from 'App/Supports/Response'

export default class LogoutController {
  public async handle({ response, auth }: HttpContextContract): Promise<object> {
    await auth.use('api').authenticate()
    const isLoggedIn: boolean = auth.use('api').isLoggedIn

    if (!isLoggedIn) {
      return new Response(response).badRequest(`You're not loggedin`)
    }

    await auth.use('api').revoke()

    // Emit logout event
    return new Response(response).success(`You're now logged out!`)
  }
}
