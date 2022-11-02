import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthService from 'App/Services/AuthService'
import LoginValidator from 'App/Validators/LoginValidator'

export default class LoginController {
  public async handle({ auth, request, response }: HttpContextContract): Promise<object> {
    const payload = await request.validate(LoginValidator)

    return await new AuthService().login(
      { auth, response },
      {
        email: payload.email,
        password: payload.password,
      }
    )
  }
}
