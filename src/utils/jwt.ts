import jwt from 'jsonwebtoken'
import { promisify } from 'util'

type Verify = (token: string, secretOrPublicKey: jwt.Secret, options?: jwt.VerifyOptions | undefined) => Promise<object | string>
type Sign = (payload: string | object | Buffer, secretOrPrivateKey: jwt.Secret, options?: jwt.SignOptions | undefined) => Promise<string | undefined>

const sign: Sign = promisify(jwt.sign)
const verify: Verify = promisify(jwt.verify)

export async function genereteToken (payload: string | object | Buffer = {}) {
  return await sign(payload, String(process.env.JWT_SECRET), { 
    expiresIn: '1d',
  })
}

export async function  verifyToken(token:string) {
  return await verify(token, String(process.env.JWT_SECRET))
}