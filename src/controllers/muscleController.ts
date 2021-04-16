import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import Muscle from '@models/Muscle'
import MuscleRepository from '@repositories/MuscleRepository'

class MuscleController {
  async store (req: Request, res: Response) {
    const { label }: Muscle = req.body

    const muscleRepository = getCustomRepository(MuscleRepository)

    const muscle = muscleRepository.create({ label })

    await muscleRepository.save(muscle)

    return res.status(201).json(muscle)
  }

  async index (req: Request, res: Response) {
    const muscleRepository = getCustomRepository(MuscleRepository)

    const muscles = await muscleRepository.find()

    return res.json(muscles)
  }
}

export default new MuscleController()
