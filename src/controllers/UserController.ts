import { Request, Response } from 'express'
import UserRepository from '../repositories/UserRepository'
import { getCustomRepository } from 'typeorm'

import User from '@models/User'


class UserController {
  async store (req: Request, res: Response) {
    const { email, name }: User = req.body

    try {
      const userRepository = getCustomRepository(UserRepository)

      const user = userRepository.create({ email, name })
  
      const userAlreadyExists = await userRepository.findOne({ email })

      if (userAlreadyExists) {
        return res.status(400).json({ err: 'User already exists' })
      }
      
      await userRepository.save(user)
  
      return res.json(user)
    } catch (err) {
      console.log(err)
    }
  }
  async index (req: Request, res: Response) { 
    const userRepository = getCustomRepository(UserRepository)
    
    const users = await userRepository.find()

    return res.json(users)
  } 

  async show (req: Request, res: Response) {
    try {
      const id = req.params.id

      const userRepository = getCustomRepository(UserRepository)
      
      const user = await userRepository.findOne({ id })
  
      return res.json(user)
    } catch (err) {
      return res.json(err)
    }
  }
}

export default new UserController()
