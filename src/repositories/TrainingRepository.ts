import Training from "@models/Training"
import { EntityRepository, Repository } from "typeorm"

@EntityRepository(Training)
class TrainingRepository extends Repository<Training> {}

export default TrainingRepository
