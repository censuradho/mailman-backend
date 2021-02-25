import { Request , Response } from 'express'

abstract class BaseController {
  _page: number

  constructor () {
    this._page = 10
  }

  async store (req: Request, res: Response): Promise<any> {}

  async index (req: Request, res: Response): Promise<any> {}

  async show (req: Request, res: Response): Promise<any> {}

  async delete (req: Request, res: Response): Promise<any> {}
}

export default BaseController
