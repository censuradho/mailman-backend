import { Request, Response, NextFunction } from 'express'

import * as jwt from '@utils/jwt'

async function authorization (req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization

    const token = authHeader && authHeader.split(' ')[1]
  
    if (!token) return res.status(401).json({ message: 'authorization header is not provided' })
  
    const isValidToken = await jwt.verifyToken(token)
  
    
    if (!isValidToken) return res.status(401).json({ message: 'Token is not valid' })
  
    next()
  } catch (err) {
    if (err.expiredAt) {
      return res.status(401).json({  
        error: {
          token: { expiredAt: err.expiredAt }
        }
      })
    }
  }
}

export default authorization
