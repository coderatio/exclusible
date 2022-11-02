import Application from '@ioc:Adonis/Core/Application'
import * as fs from 'fs'
import Database, { SqliteConfig } from '@ioc:Adonis/Lucid/Database'
import Migrator from '@ioc:Adonis/Lucid/Migrator'

const dbName = String(process.env.TEST_DB)
export const testDbPath = Application.makePath(dbName)

const connection: string = String(process.env.DB_CONNECTION)

export const testDbConfig: SqliteConfig = {
  client: 'sqlite',
  connection: {
    filename: testDbPath,
  },
  migrations: {
    naturalSort: true,
    paths: ['./database/migrations'],
  },
  useNullAsDefault: true,
}

interface CleanDBOptions {
  drop: boolean
}

export class TestSuit {
  public static async initializeDatabase() {
    Database.manager.add(connection, testDbConfig)
    this.create()

    const migrator = new Migrator(Database, Application, {
      direction: 'up',
      dryRun: false,
      connectionName: connection,
    })

    await migrator.run()
  }

  public static async cleanUpDatabase(options?: CleanDBOptions) {
    await Database.manager.close(connection)

    if (!options?.drop) {
      return
    }

    this.drop()
  }

  public static getConnection(): string {
    return connection
  }

  private static create(): void {
    fs.open(testDbPath, 'w', () => {})
  }

  private static drop(): void {
    fs.unlink(testDbPath, () => {})
  }
}
