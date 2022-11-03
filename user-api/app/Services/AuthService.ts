import LoginDto from 'App/DataObjects/LoginDto'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import Response from 'App/Supports/Response'
import x from 'Config/x'

export default class {
  public async login(context: { auth; response }, loginDto: LoginDto): Promise<object> {
    const user: User | null = await User.query().where('email', loginDto.email).first()
    const computedPassword = user?.passwordSalt + loginDto.password
    const message = 'Invalid credentials'

    if (!user) {
      return new Response(context.response).unauthorized(message)
    }

    if (!(await Hash.verify(String(user?.password), computedPassword))) {
      return new Response(context.response).unauthorized(message)
    }

    const token = await context.auth.use('api').generate(user, {
      expiresIn: x.auth.expiresIn,
    })

    return new Response(context.response).success(`You're loggedin`, {
      email: loginDto.email,
      token: {
        type: token.type,
        token: token.token,
        expiresAt: token.expiresAt,
      },
    })
  }
}
