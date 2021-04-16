import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import UserRepository from '@repositories/UserRepository'

import * as bcrypt from '@utils/bcrypt'
import * as jwt from '@utils/jwt'

interface Session {
  email: string,
  password: string
}

class SessionController {
  async store (req: Request, res: Response) {
    try {
      const { email, password }: Session = req.body

      const userRepository = getCustomRepository(UserRepository)
  
      const user = await userRepository.findOne({ email })
  
      if (!user) return res.status(401).json({ message: 'wrong credentials.email provided' })
  
      const rightPassword = await bcrypt.compareHash(password, user.password)
  
      if (!rightPassword) return res.status(401).json({ message: 'wrong credentials.password provided' })
  
      const { password: pass, ...returnUser } = user 

      const token = await jwt.genereteToken()

      return res.json({
        token,
        ...returnUser
      })
    } catch (err) {
      
      return res.status(500).json(err)
    }
  }
}

export default new SessionController()
