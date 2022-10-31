import { beforeAll, describe, expect, it, afterEach } from '@jest/globals'
import Redis from '@ioc:Adonis/Addons/Redis'

describe('Redis Driver', () => {
  let message: string
  let channel: string
  let RedisMock

  beforeAll(async () => {
    RedisMock = require('ioredis')

    message = `I'm a published message`
    channel = `my-channel-${1 + Math.round(Math.random())}`
  })

  afterEach((done) => {
    new RedisMock().flushall().then(() => done())
  })

  it('should have driver installed and defined', () => {
    expect(Redis).toBeDefined()
    expect(RedisMock).toBeDefined()
  })

  it('should establish a successful connection', async () => {
    const redis = new RedisMock()
    await redis.set('foo', 'bar')

    expect(await redis.get('foo')).toBe('bar')
  })

  it('should publish to a channel', async () => {
    const redis = new RedisMock()
    redis.publish(channel, message, (error) => expect(error).toBeNull())
  })

  it('should subscribe to a channel', async () => {
    const redisPub = new RedisMock()
    const redisSub = new RedisMock()

    redisSub.on('message', (ch, msg) => {
      expect(ch).toBe(channel)
      expect(msg).toBe(message)
    })

    redisSub.subscribe(channel)
    redisPub.publish(channel, message)
  })
})
