import { createConnection, getConnectionOptions } from 'typeorm'
import dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config()

type Db = 'production' | 'test' | 'development'

function getDatabase  () {
  const db = {
    production: 'production',
    test: `${resolve(__dirname, '..', 'database', 'db.test.sqlite')}`,
    development: 'development'
  }

  return db[process.env.NODE_ENV as Db]
}

function getType () {
  return process.env.NODE_ENV === 'test' ? 'sqlite' : 'postgres'
}

export default async () => {
  const options = await getConnectionOptions()

  return await createConnection(
    Object.assign(options, {
      database: getDatabase(),
      type: getType()
    })
  )
}
