import { beforeAll, describe, it } from '@jest/globals'
const request = require('supertest')
import Env from '@ioc:Adonis/Core/Env'

describe('Test base URL', () => {
  let app: typeof request

  beforeAll(() => {
    app = request(`http://${Env.get('HOST')}:${Env.get('PORT')}`)
  })

  it('should load the base URL and return JSON', () => {
    app.get('/').expect('Content-Type', '/json/').expect(200, { hello: 'world' })
  })
})
