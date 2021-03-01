import jwt from 'jsonwebtoken'
import { promisify } from 'util'

type Verify = (token: string, secretOrPublicKey: jwt.Secret, options?: jwt.VerifyOptions | undefined) => Promise<object | string>

const sign = promisify(jwt.sign)
const verify: Verify = promisify(jwt.verify)

export async function genereteToken (payload: string | object | Buffer) {
  return await sign(payload, process.env.JWT_SECRET)
}

export async function  verifyToken(token:string) {
  return await verify(token, process.env.JWT_SECRET)
}