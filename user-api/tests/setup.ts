import Application from '@ioc:Adonis/Core/Application'
import * as fs from 'fs'
import Database, { SqliteConfig } from '@ioc:Adonis/Lucid/Database'
import Migrator from '@ioc:Adonis/Lucid/Migrator'

const dbName = 'test.sqlite3'
const dbPath = Application.makePath(`tests/${dbName}`)

const connection: string = 'test_connection'

export const testDbConfig: SqliteConfig = {
  client: 'sqlite',
  connection: {
    filename: dbPath,
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

    if (options?.drop) {
      this.drop()
    }
  }

  public static getConnection(): string {
    return connection
  }

  private static create(): void {
    fs.open(dbPath, 'w', () => {})
  }

  private static drop(): void {
    fs.unlink(dbPath, () => {})
  }
}
