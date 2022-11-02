import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import { TestSuit } from '../setup'

test.group('Given a user needs an account to use the app', (group) => {
  group.setup(async () => {
    await TestSuit.initializeDatabase()
  })

  group.teardown(async () => {
    await TestSuit.cleanUpDatabase({ drop: true })
  })

  test('should validate inputs from the user', async ({ client }) => {
    const payload = getDummyPayload()
    payload.firstName = ''

    const response = await client.post('/register').json(payload)
    response.assertStatus(422)
  })

  test('should register a user successfully', async ({ client }) => {
    const payload = getDummyPayload()
    const response = await client.post('/register').json(payload)

    response.assertStatus(200)
    response.assertBodyContains({
      state: 'success',
      message: 'Registered successfully',
    })
    response.assertBodyContains({
      data: {
        firstName: payload.firstName,
        email: payload.email,
      },
    })
  })
})

const getDummyPayload = () => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()

  return {
    firstName,
    lastName,
    email: faker.internet.email(),
    password: '@#secret',
    confirmPassword: '@#secret',
  }
}
