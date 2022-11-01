import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from 'Database/factories/UserFactory'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    const adminUser = await User.query().where('role', 'admin').first()

    if (!adminUser) {
      await UserFactory.merge({ role: 'admin' }).create()
    }

    await UserFactory.createMany(5)
  }
}
