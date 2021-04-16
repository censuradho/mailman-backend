import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import UserRepository from '@repositories/UserRepository'

class LookupController {
  async index (req: Request, res: Response) {
    const { email } = req.params

    const userRepository = getCustomRepository(UserRepository)

    const userExist = await userRepository.findOne({ email })

    console.log(userExist)
  
    if (userExist) {
      return res.json({
        can_login: true,
        exists: true
      })
    }

    return res.json({
      can_login: false,
      exists: false
    })
  }
}

export default new LookupController()
