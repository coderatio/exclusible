import { test } from '@japa/runner'
import { TestSuit } from '../setup'
import UserFactory from 'Database/factories/UserFactory'
import UserDto from 'App/DataObjects/UserDto'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Given that registration is required', (group) => {
  let userFactory

  group.setup(async () => {
    await TestSuit.initializeDatabase()
    userFactory = UserFactory.connection(TestSuit.getConnection())
  })

  group.teardown(async () => {
    await TestSuit.cleanUpDatabase({ drop: true })
  })

  test('should create a user', async ({ assert }) => {
    const user: UserDto = await UserFactory.connection(TestSuit.getConnection())
      .merge({ firstName: 'Josiah' })
      .create()

    assert.isDefined(user.firstName)
    assert.equal(user.firstName, 'Josiah')
  })

  test('should ensure email is unique', async ({ assert }) => {
    const user: UserDto = await userFactory.create()
    assert.isDefined(user.email)
    assert.isDefined(user.firstName)

    await assert.rejects(
      async () =>
        await UserFactory.connection(TestSuit.getConnection()).merge({ email: user.email }).create()
    )
  })

  test('should create salt and password correctly', async ({ assert }) => {
    const user: User = await userFactory.create()
    const dbUser: any = await Database.connection(TestSuit.getConnection())
      .from(User.table)
      .where('email', user.email)
      .first()

    assert.isDefined(user.passwordSalt)
    assert.equal(user.passwordSalt.length, 32)
    assert.equal(user.passwordSalt, dbUser.password_salt)
    assert.isDefined(user.password)
    assert.isTrue(user.password.startsWith('$argon2id'))
  })
})
