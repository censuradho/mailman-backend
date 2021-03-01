import { generateHash, compareHash } from '../../utils/bcrypt'

describe('Bcrypt', () => {
  it ('should be generate a hash base on string passad as param', async () => {
    const hash = await generateHash('123')
    expect(hash).toBeTruthy()
  })

  it ('shoul be truthy equivalente the comparasion', async () => {
    const string = '123'

    const hash = await generateHash(string)
    const isEqual = await compareHash(string, hash)

    expect(isEqual).toBe(true)
  })
})