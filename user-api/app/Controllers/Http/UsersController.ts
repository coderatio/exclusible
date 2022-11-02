import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'
import UserService from 'App/Services/UserService'

export default class UsersController {
  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterUserValidator)
    delete payload.confirmPassword

    return UserService.register(response, payload)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
