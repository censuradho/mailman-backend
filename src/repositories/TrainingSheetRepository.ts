import TrainingSheet from "@models/TrainingSheet";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(TrainingSheet)
class TrainingSheetRepository extends Repository<TrainingSheet> {}

export default TrainingSheetRepository
