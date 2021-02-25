import createConnection from '../database'
import request from 'supertest'
import app from '../app'

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  it ('should be register a new user', async () => {
    const response = await request(app)
      .post('/api/v1/user')
      .send({
        email: "gustavo.o@openbox.ai",
        name: "Gustavo"
      })
      console.log(response)

    expect(response.status).toBe(200)
  })
})