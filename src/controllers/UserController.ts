import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import UserRepository from '@repositories/UserRepository'

import { generateHash } from '@utils/bcrypt'

import User from '@models/User'

class UserController {
  async store (req: Request, res: Response) {
    const { email, username, password }: Pick<User, 'email' | 'username' | 'password'> = req.body

    try {
      const userRepository = getCustomRepository(UserRepository)

      const userAlreadyExists = await userRepository.findOne({ email })

      if (userAlreadyExists) return res.status(400).json({ message: 'User already exists' })

      const passHashed = await generateHash(password)

      const user = userRepository.create({ email, username, password: passHashed })

      await userRepository.save(user)
  
      return res.status(201).json(user)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500)
    }
  }

  async index (req: Request, res: Response) { 
    try {
      const userRepository = getCustomRepository(UserRepository)
      const { paginate } = res.locals

      const users = await userRepository.find({ skip: paginate._page, take: paginate._limit })
      const userCount = await userRepository.count()

      return res.json({
        count: userCount,
        results: users
      })

    } catch (err) {
      return res.status(500).send(err)
    }
  } 

  async show (req: Request, res: Response) {
    try {

      const id = parseInt(req.params.id, 10)
      
      const userRepository = getCustomRepository(UserRepository)
      
      const user = await userRepository.findOne({ id })
      
      if (!user) return res.sendStatus(204)
    
      return res.json(user)
    } catch (err) {
      return res.json(err)
    }
  }

  async update (req: Request, res: Response) {
    const id = parseInt(req.params.id, 10)

    const { created_at, updated_at, ...user}: Partial<User> = req.body

    try {
      const userRepository = getCustomRepository(UserRepository)

      const userExist = await userRepository.findOne({ id })

      if (!userExist) return res.status(400).json({ message: 'User not exist' })

      await userRepository
        .createQueryBuilder()
        .update({
          updated_at: new Date(),
          ...user
        })
        .set(user)
        .where('id = :id', { id })
        .execute()

      return res.sendStatus(201)
    } catch (err) {
      return res.sendStatus(500)
    }
  }

  async delete (req: Request, res: Response) {
    const id = parseInt(req.params.id, 10)

    try {
      const userRepository = getCustomRepository(UserRepository)

      const userExist = await userRepository.findOne({ id })
    
      if (!userExist) return res.status(401).json({ message: 'User not exist' })

      await userRepository.delete({ id })
  
      return res.sendStatus(201)
    } catch (err) {

    }
  }
}

export default new UserController()
