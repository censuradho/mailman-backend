import Muscle from "@models/Muscle"
import { EntityRepository, Repository } from "typeorm"

@EntityRepository(Muscle)
class MuscleRepository extends Repository<Muscle> {}

export default MuscleRepository
