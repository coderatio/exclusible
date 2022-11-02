import { test } from '@japa/runner'
import { TestSuit } from '../setup'
import UserFactory from 'Database/factories/UserFactory'

test.group('Given a user wants to see their dashboard', (group) => {
  group.setup(async () => {
    await TestSuit.initializeDatabase()
  })

  group.teardown(async () => {
    await TestSuit.cleanUpDatabase()
  })

  test('should validate credentials', async ({ client }) => {
    const password = 'josiah'
    const user = await UserFactory.connection(TestSuit.getConnection()).create()

    const response = await client.post('/login').json({
      email: user.email,
      password,
    })

    response.assertStatus(401)
    response.assertBodyContains({ message: 'Invalid credentials' })
  })

  test('should login with valid credentials', async ({ client, assert }) => {
    const password = 'josiah'
    const user = await UserFactory.connection(TestSuit.getConnection()).merge({ password }).create()

    const response = await client.post('/login').json({
      email: user.email,
      password,
    })

    const body = response.body()

    response.assertStatus(200)
    assert.equal(body.state, 'success')
    assert.isDefined(body.data.token.token)
  })
})
