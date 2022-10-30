import { expect, it, describe } from '@jest/globals'
import KrakenService from 'App/Services/kraken.service'

describe('Kraken Service', () => {
  it('should be defined', function () {
    expect(KrakenService).toBeDefined()
  })
})
