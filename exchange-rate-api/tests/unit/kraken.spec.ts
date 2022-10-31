import { expect, it, describe, jest } from '@jest/globals'
import KrakenService from 'App/Services/kraken.service'

describe('Kraken Service', () => {
  it('should be defined', function () {
    expect(KrakenService).toBeDefined()
  })

  jest.spyOn(KrakenService, 'init')
  it('should call init() method', function () {
    expect(KrakenService.init()).toBeDefined()
    expect(KrakenService.init).toBeCalledTimes(1)
  })

  it('should establish a websocket connection', function () {
    const sampleConfig = {
      timeout: 1000,
      ws: { priv: { hostname: 'ws-auth.kraken.com' }, pub: { hostname: 'ws.kraken.com' } },
    }

    expect(KrakenService.init).toReturnWith(sampleConfig)
  })

  it('should call the run() method', async function () {
    // @ts-ignore
    const run = (KrakenService.prototype.run = jest.fn())

    run()

    expect(run).toBeCalledTimes(1)
  })
})
