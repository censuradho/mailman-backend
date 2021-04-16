import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import UserRepository from '@repositories/UserRepository'

import { generateHash } from '@utils/bcrypt'

import User from '@models/User'

class UserController {

  async store (req: Request, res: Response) {

    const { email, username, password, last_name, name }: User = req.body

    try {
      const userRepository = getCustomRepository(UserRepository)

      const userAlreadyExists = await userRepository.findOne({ email })

      if (userAlreadyExists) return res.status(400).json({ message: 'User already exists' })

      const passHashed = await generateHash(password)

      const user = userRepository.create({ email, username, password: passHashed, last_name, name })

      await userRepository.save(user)
  
      const { password: passwordStored, ...userCreated } = user
      return res.status(201).json(userCreated)
    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  }

  async index (req: Request, res: Response) { 
    try {
      const userRepository = getCustomRepository(UserRepository)
      const { paginate } = res.locals

      const users = await userRepository.find({ 
        skip: +paginate._page, 
        take: +paginate._limit,
      })

      const userCount = await userRepository.count()

      return res.json({
        count: userCount,
        results: users
      })

    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  } 

  async show (req: Request, res: Response) {
    try {

      const id = req.params.id
      
      const userRepository = getCustomRepository(UserRepository)
      
      const User = await userRepository.findOne({ 
        where: id, 
        select: ['username', 'email', 'created_at', 'updated_at', 'id']
      })
      
      if (!User) return res.sendStatus(204)
    
      const { password, ...user} = User

      return res.json(user)
    } catch (err) {
      return res.json(err)
    }
  }

  async update (req: Request, res: Response) {
    const id = req.params.id

    const user: Partial<User> = req.body

    try {
      const userRepository = getCustomRepository(UserRepository)

      const userExist = await userRepository.findOne({ id })

      if (!userExist) return res.status(400).json({ message: 'User not exist' })

      await userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          ...user,
          updated_at: new Date()
        })
        .where('id = :id', { id })
        .execute()

      return res.sendStatus(201)
    } catch (err) {
      return res.status(500).send(err)
    }
  }

  async delete (req: Request, res: Response) {
    const id = req.params.id

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
