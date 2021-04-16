import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { validate as validateUUID } from 'uuid'

import MuscleRepository from '@repositories/MuscleRepository'
import TrainingRepository from '@repositories/TrainingRepository'
import TrainingSheetRepository from '@repositories/TrainingSheetRepository'

import Training from '@models/Training'

import getQueries from '@utils/getQueries'

type TrainingData = Omit<Training, 'id' | 'muscle' | 'training_sheet'>
type TrainingQueries = TrainingData

interface RequestBody extends TrainingData {
  training_sheet_id: string,
  muscle_id: string
}

class TrainingController {
  async store (req: Request, res: Response) {
    const { 
      comments,
      exercise,
      repetitions,
      series,
      weight,
      training_sheet_id,
      muscle_id
    }: RequestBody = req.body

    const isValidMuscleUUID = validateUUID(muscle_id)
    const isValidTrainingSheetUUID = validateUUID(training_sheet_id)

    if (!isValidMuscleUUID) return res.status(400).json({ message: 'muscle_id UUID is not valid' })
    if (!isValidTrainingSheetUUID) return res.status(400).json({ message: 'training_sheet_id UUID is not valid' })

    const muscleRepository = getCustomRepository(MuscleRepository)
    const trainingSheetRepository = getCustomRepository(TrainingSheetRepository)
    const trainingRepository = getCustomRepository(TrainingRepository)

    const muscle = await muscleRepository.findOne({ id: muscle_id })
    if (!muscle) return res.status(400).json({ message: 'Has no Muscle entity associate to id provided' })

    const training_sheet = await trainingSheetRepository.findOne({ id: training_sheet_id })
    if (!training_sheet) return res.status(400).json({ message: 'Has no Training sheet entity associate to id provided' })

    const training = trainingRepository.create({
        comments,
        exercise,
        repetitions,
        series,
        weight,
        muscle,
        training_sheet
    })
    try {
      await trainingRepository.save(training)
  
      return res.status(201).json(training)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Internal server error, can not saved training entity. Try again.' })
    }
  }

  async show (req: Request, res: Response) {
    const { id } = req.params

    try {
      const trainingRepository = getCustomRepository(TrainingRepository)

      const isValidUUID = validateUUID(id)

      if (!isValidUUID) return res.status(400).json({ message: 'id provided is not an UUID valid.' })

      const training = await trainingRepository.findOne({ id })

      if (!training) return res.status(400).json({ message: 'Has no Training entity associate to id provided.' })

      return res.json(training)

    } catch (err) {
      return res.status(500).json(err)
    }
  }

  async index (req: Request, res: Response) {
    try {
      const trainingRepository = getCustomRepository(TrainingRepository)

      if (req.query) {
        const queries: Partial<keyof TrainingQueries>[] = ['comments', 'exercise', 'repetitions', 'series', 'weight']
        const where = getQueries(queries, req.query)

        const training = await trainingRepository.findOne({ where })
        
        return res.json(training)
      }
      
      const { paginate } = res.locals
  
      const training = await trainingRepository.find({
        skip: +paginate._page, 
        take: +paginate._limit,
      })
  
      const trainingCount = await trainingRepository.count()
  
      return res.json({
        count: trainingCount,
        results: training
      })
    } catch (err) {
      return res.status(500).json(err)
    }

  }
}

export default new TrainingController()
