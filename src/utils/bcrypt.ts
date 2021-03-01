import bcrypt from 'bcrypt'
import { promisify } from 'util'

const saltRounds = 10

type GetSalt = (rounds: number) => Promise<string>
type GenHash = (testPass: any, saltOrRounds: string | number) => Promise<string>
type Compare = (data: any, encrypted: string) => Promise<boolean>

const genSalt: GetSalt = promisify(bcrypt.genSalt)
const genHash: GenHash = promisify(bcrypt.hash)
const compare = promisify(bcrypt.compare)

export async function generateHash (password: string) {
  const salt = await genSalt(saltRounds)
  const hash = await genHash(password, salt)
  
  return hash
}

export async function compareHash (password: string, hash: string) {
  const isEqual = await compare(password, hash)
  return isEqual
}