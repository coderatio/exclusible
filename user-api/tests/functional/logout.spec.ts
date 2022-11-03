import { test } from '@japa/runner'
import { TestSuit } from '../setup'
import UserFactory from 'Database/factories/UserFactory'

test.group('Given a user wants to logout', (group) => {
  group.each.setup(async () => {
    await TestSuit.initializeDatabase()

    return async () => await TestSuit.cleanUpDatabase()
  })

  test('should logout correctly and successfully', async ({ client, assert }) => {
    const user = await UserFactory.connection(TestSuit.getConnection())
      .merge({ password: 'josiah' })
      .create()

    // Login
    const login = await client.post('/login').json({
      email: user.email,
      password: 'josiah',
    })

    login.assertStatus(200)
    assert.equal(login.body().state, 'success')

    // Logout
    const request = client.delete('/logout')
    const response = await request.bearerToken(login.body().data.token.token)
    response.assertStatus(200)
    assert.equal(response.body().state, 'success')

    // Attempt logout again
    const newRequest = client.delete('/logout')
    const newResponse = await newRequest.bearerToken(login.body().data.token.token)
    assert.equal(newResponse.body().state, 'failed')
    assert.equal(newResponse.body().message, 'Unauthorized access')
  })
})
