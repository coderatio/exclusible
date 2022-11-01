import User, { Role } from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(User, ({ faker }) => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()

  return {
    firstName: firstName,
    lastName: lastName,
    role: <Role>'user',
    email: faker.internet.email(firstName.toLowerCase(), lastName.toLowerCase()),
    password: 'secret',
  }
}).build()
