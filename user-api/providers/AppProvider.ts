import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import RedisCacheService from 'App/Services/RedisCacheService'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('X/Services/RedisCache', () => {
      return new RedisCacheService()
    })
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    if (this.app.environment === 'web') {
      await import('../start/socket')
    }
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
