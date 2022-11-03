import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Response from 'App/Supports/Response'
import { AuthenticationException } from '@adonisjs/auth/build/standalone'

export default class LogoutController {
  public async handle({ response, auth }: HttpContextContract): Promise<object> {
    try {
      await auth.use('api').authenticate()
      await auth.use('api').revoke()

      // Emit logout event
      return new Response(response).success(`You're now logged out!`)
    } catch (error) {
      if (error instanceof AuthenticationException) {
        return new Response(response).badRequest(`You're not loggedin`)
      }

      throw new AuthenticationException('Unauthorized access', 'E_UNAUTHORIZED_ACCESS')
    }
  }
}
