import { Request, Response } from 'express'
import User from 'src/models/User'
import { getRepository } from 'typeorm'

interface User {
  email: string,
  name: string
}

class UserController {
  async store (req: Request, res: Response) {
    const { email, name }: User = req.body

    const userRepository = getRepository(User)

    const user = userRepository.create({ email, name })
  }
}

export default new UserController()
