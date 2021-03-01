import { Paginate } from '@middleware/pagination'
import 'express'

declare global {
  namespace Express {
    interface Response {
      locals: {
        paginate: Paginate
      }    
    }
  }
}