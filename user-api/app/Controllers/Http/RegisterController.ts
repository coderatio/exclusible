import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'
import UserService from 'App/Services/UserService'

export default class RegisterController {
  public async handle({ request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterUserValidator)
    delete payload.confirmPassword

    return UserService.register(response, payload)
  }
}
