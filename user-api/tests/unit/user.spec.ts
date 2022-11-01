import { afterAll, it, expect, beforeAll, describe } from '@jest/globals'
import { TestSuit } from '../setup'
import UserFactory from 'Database/factories/UserFactory'
import UserDto from 'App/DataObjects/user.dto'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'

let userFactory

beforeAll(async () => {
  await TestSuit.initializeDatabase()

  userFactory = UserFactory.connection(TestSuit.getConnection())
})

afterAll(async () => {
  TestSuit.cleanUpDatabase({ drop: true }).finally()
})

describe('Given that registration is required', () => {
  it('should create a user', async () => {
    const user: UserDto = await UserFactory.connection(TestSuit.getConnection())
      .merge({ firstName: 'Josiah' })
      .create()

    expect(user.firstName).toBeDefined()
    expect(user.firstName).toBe('Josiah')
  })

  it('should ensure email is unique', () => {
    userFactory.create().then((user: UserDto) => {
      expect(user.email).toBeDefined()
      expect(user.firstName).toBeDefined()

      UserFactory.connection(TestSuit.getConnection())
        .merge({ email: user.email })
        .create()
        .catch((error) => {
          expect(error.message).toBe('aborted')
        })
    })
  })

  it('should create salt and password correctly', async () => {
    userFactory.create().then(async (user: User) => {
      const dbUser: User = await Database.connection(TestSuit.getConnection())
        .from(User.table)
        .where('email', user.email)
        .first()

      expect(user.passwordSalt).toBeDefined()
      expect(user.passwordSalt.length).toBe(16)
      expect(user.passwordSalt).toBe(dbUser.passwordSalt)
      expect(user.password).toBeDefined()
      expect(user.password.startsWith('$argon2id')).toBeTruthy()
    })
  })
})
