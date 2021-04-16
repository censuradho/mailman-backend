import Address from '@models/Address'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Address)
class AddressRepositori extends Repository<Address> {}

export default AddressRepositori
