import { it, describe } from '@jest/globals'
import Env from '@ioc:Adonis/Core/Env'
const request = require('supertest')

const baseUrl = `http://${Env.get('HOST')}:${Env.get('PORT')}`

describe('Given the base endpoint is needed', () => {
  it('should display welcome page', () => {
    request(baseUrl).get('/').expect(200, { service: 'User Api' })
  })
})
