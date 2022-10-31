import { beforeAll, describe, expect, it } from '@jest/globals'

const request = require('supertest')
import Env from '@ioc:Adonis/Core/Env'
import { Response } from 'superagent'

describe('Health Check', () => {
  let app: typeof request
  let route: string = 'health'

  beforeAll(() => {
    app = request(`http://${Env.get('HOST')}:${Env.get('PORT')}/`)
  })

  it('should load health check URL', () => {
    app.get(route).expect('Content-Type', /json/).expect(200)
  })

  it('should tell when app is unhealthy', async () => {
    const response: Response = await app.get(route)

    let status: boolean = response.body.healthy
    if (response.body.healthy) {
      status = false
    }

    expect(response.status).toEqual(200)
    expect(status).toBeFalsy()
  })

  it('should return app key health checks', async () => {
    const response: Response = await app.get(route)

    expect(response.status).toEqual(200)
    expect(response.body.report.appKey).toBeDefined()
  })

  it('should check that app key is healthy', async () => {
    const response: Response = await app.get(route)

    expect(response.status).toEqual(200)
    expect(response.body.report.appKey).toBeDefined()
    expect(response.body.report.appKey.health.healthy).toBeTruthy()
  })

  it('should return redis instance health checks', async () => {
    const response: Response = await app.get(route)

    expect(response.status).toEqual(200)
    expect(response.body.report.redis.health).toBeDefined()
    expect(response.body.report.redis.meta[0].status).toBe('ready')
    expect(response.body.report.redis.meta[0].error).toBeNull()
  })
})
