import { Entity, OneToMany, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm'
import { v4 as uuid } from 'uuid'

import TrainingSheet from './TrainingSheet'

@Entity('historic_training_sheet')
class HistoricTrainingSheet {

  @PrimaryColumn('uuid')
  id: string

  @OneToMany(() => TrainingSheet, trainingSheet => trainingSheet.historic)
  training_sheet: TrainingSheet[]

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export default HistoricTrainingSheet
