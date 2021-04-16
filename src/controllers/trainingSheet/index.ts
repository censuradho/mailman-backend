import { Response, Request } from 'express'
import { getCustomRepository } from 'typeorm'

import TrainingSheetRepository from '@repositories/TrainingSheetRepository'

import TrainingSheetModel from '@models/TrainingSheet'

type TrainingSheet = Pick<TrainingSheetModel, 'weekly_frequency' | 'revaluation' | 'weight' | 'goal' | 'comments' | 'is_evaluated'>

interface TrainingSheetBodyRequest extends TrainingSheet {

}

class TrainingSheetController {
  async store (req: Request, res: Response) {
    try {
      const { 
        is_evaluated, 
        weight,
        comments,
        goal,
        weekly_frequency,
        revaluation,

      }: TrainingSheetModel = req.body
  
      const trainingSheetRepository = getCustomRepository(TrainingSheetRepository)

      const trainingSheet = trainingSheetRepository.create({
        is_evaluated, 
        weight,
        comments,
        goal,
        weekly_frequency,
        revaluation,
      })

      await trainingSheetRepository.save(trainingSheet)

      return res.status(201).json(trainingSheet)

    } catch (err) {
      console.log(err)
      return res.status(500).send(err)
    }
  }

  async index (req: Request, res: Response) {
    try {
      const trainingSheetRepository = getCustomRepository(TrainingSheetRepository)

      const trainingSheet = await trainingSheetRepository.find()
  
      return res.json(trainingSheet)
    } catch (err) {
      return res.status(500).send(err)
    }
  }
}

export default new TrainingSheetController()
