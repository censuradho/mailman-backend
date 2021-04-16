import { createConnection, getConnectionOptions } from 'typeorm'
import dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config()

type Db = 'production' | 'test' | 'development'

function getDatabase  () {
  const db = {
    production: 'production',
    test: 'test',
    development: 'development'
  }

  return db[process.env.NODE_ENV as Db]
}

export default async () => {
  const options = await getConnectionOptions()

  return await createConnection(
    Object.assign(options, {
      database: getDatabase(),
    })
  )
}
