import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import ServeyRepository from '@repositories/SurveyRepository'
import Survey from '@models/Survey'

type SurveyProps = Survey

import { PER_PAGE } from '@config/constraints'

class SurveyController {

  async store (req: Request, res: Response) {

    const { title, description }: SurveyProps = req.body

    try {
      const surveyRepository = getCustomRepository(ServeyRepository)

      const survey = surveyRepository.create({
        title, description
      })
  
      await surveyRepository.save(survey)
  
      return res.json(survey)
    } catch (err) {}
  }

  async index (req: Request, res: Response) {
    try {
      try {
        const skip = Number(req.query.page) || PER_PAGE

        const surveyRepository = getCustomRepository(ServeyRepository)
  
        const surveis = await surveyRepository.find({ skip })
  
        return res.json(surveis)
      } catch (err) {
        console.log(err)
      }
    } catch (err) {}
  }
}

export default new SurveyController()
