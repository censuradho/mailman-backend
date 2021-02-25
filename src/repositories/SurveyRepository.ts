import Survey from "@models/Survey";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Survey)
class ServeyRepository extends Repository<Survey> {}

export default ServeyRepository
