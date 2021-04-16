import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

import Muscle from './Muscle'
import TrainingSheet from './TrainingSheet'

@Entity('training')
class Training {

  @PrimaryColumn('uuid')
  id: string

  @Column()
  exercise: string
  
  @Column('int')
  series: number

  @Column('int')
  repetitions: string

  @Column('float')
  weight: number

  @ManyToOne(() => Muscle, muscle => muscle.training)
  muscle: Muscle

  @ManyToOne(() => TrainingSheet, trainingSheet => trainingSheet.training)
  training_sheet: TrainingSheet

  @Column()
  comments: string

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export default Training
