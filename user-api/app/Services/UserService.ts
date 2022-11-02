import UserDto from 'App/DataObjects/UserDto'
import User from 'App/Models/User'
import Response from 'App/Supports/Response'

export default class {
  public static async register(response, userDto: UserDto) {
    return User.create(userDto).then((user) => {
      return new Response(response).success('Registered successfully', <Partial<UserDto>>{
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        email: userDto.email,
        createdAt: user.createdAt,
      })
    })
  }
}
