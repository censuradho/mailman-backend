import request from 'supertest'

import app from '../../app'
import createConnection from '../../database'

import * as jwt from '@utils/jwt'

describe('Users', () => {
  const user = {
    email: 'censuradho@gmail.com',
    username: 'censuradho',
    password: '1238874'
  }

  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  it ('should be register a new user', async () => {
    const response = await request(app)
      .post(`${process.env.BASE_URL}/user`)
      .send(user)

    expect(response.status).toBe(201)
  })

  it ('should not be able to create a user if email passed already exist on database', async () => {
    const response = await request(app)
      .post(`${process.env.BASE_URL}/user`)
      .send(user)

    expect(response.status).toBe(400)
  })

  it ('should be return a list of users', async () => {
    const token = await jwt.genereteToken()

    const response = await request(app)
    .get(`${process.env.BASE_URL}/user`)
    .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
  })

})