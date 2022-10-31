import { beforeAll, describe, expect, it } from '@jest/globals'
import Redis from '@ioc:Adonis/Addons/Redis'
import Env from '@ioc:Adonis/Core/Env'

describe('Redis Driver', () => {
  let client
  let message
  let channel

  beforeAll(() => {
    const redis = require('redis-mock')
    client = redis.createClient(6379, Env.get('REDIS_HOST'))

    message = 'I was published'
    channel = 'my_channel'
  })

  it('should be defined', () => {
    expect(Redis).toBeDefined()
    expect(client).toBeDefined()
  })

  it('should establish successful connection', () => {
    client.on('connect', (error) => expect(error).toBeUndefined())
  })

  it('should publish to a channel', async () => {
    await client.publish(channel, message, (error) => {
      expect(error).toBeUndefined()
    })
  })

  it('should subscribe to a channel', async () => {
    const subscriber = client.duplicate()
    subscriber.on('connect', (error) => expect(error).toBeUndefined())

    await subscriber.subscribe(channel, (result: string) => {
      expect(result).toEqual(message)
    })
  })
})
