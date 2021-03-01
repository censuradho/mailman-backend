import { Request, Response, NextFunction } from 'express'

export interface Paginate {
  _limit: number,
  _start: number,
  _page: number
}

interface Query {
  _limit?: string,
  _start?: string,
  _page?: string
}

const errorTitle = 'Paginate middleware'

// export function getPages (req: Request) {
//   return function(limit = 3, pageCount: number, currentPage = 1) {

//     const maxPage = pageCount

//     if (typeof limit !== 'number' || limit < 0)
//       throw new Error(`${errorTitle} - limit is not a number or is less than 0`);

//     if (typeof pageCount !== 'number' || pageCount < 0) 
//       throw new Error(`${errorTitle} - pageCount is not a number or is less than 0`);

//     if (typeof currentPage !== 'number' || currentPage < 0) 
//       throw new Error(`${errorTitle} - currentPage is not a number or is less than 0`);

//       return {
//         previous: currentPage - 1,
//         next: currentPage + 1
//       }
    
    
//   }
// }


function pagination (limit: number = 10, maxLimit = 50) {
  
  if (typeof limit !== 'number') {
    throw new Error(`${errorTitle} - limit param passed is not a number`)
  }

  return function _middleware (req: Request, res: Response, next: NextFunction) {
    const query: Query = req.query

    let _limit = (typeof query._limit === 'string') ? parseInt(query._limit, 10) : limit
    let _page = (typeof query._page === 'string') ? parseInt(query._page, 10) : 1
    let _start = (typeof query._start === 'string' ? parseInt(query._start, 10) : 1)

    if (_limit > maxLimit)
      _limit = maxLimit;
    
    if (_page < 1)
      _page = 1
    
    if (_limit < 0)
      _limit = 0
    res.locals.paginate = {}
    res.locals.paginate._limit = _limit;
    res.locals.paginate._start = _start

    next()
  }
}

export default pagination
