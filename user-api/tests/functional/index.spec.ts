import { it, describe } from '@jest/globals'
import Env from '@ioc:Adonis/Core/Env'
const request = require('supertest')

const baseUrl = `http://${Env.get('HOST')}:${Env.get('PORT')}`

describe('Homepage', () => {
  it('display welcome page', async () => {
    request(baseUrl).get('/').expect(200, { service: 'User Api' })
  })
})
