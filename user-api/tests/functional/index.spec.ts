import { test } from '@japa/runner'

test.group('Given the base endpoint is needed', () => {
  test('should display welcome page', async ({ client }) => {
    const response = await client.get('/')

    response.assertStatus(200)
    response.assertBody({ service: 'User Api' })
  })
})
