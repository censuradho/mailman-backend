import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm'
import { v4 as uuid } from 'uuid'
import HistoricTrainingSheet from './HistoricTrainingSheet'

import Muscle from './Muscle'
import Training from './Training'

@Entity('training_sheet')
class TrainingSheet {

  @PrimaryColumn('uuid')
  id: string

  @Column()
  goal: string

  @Column('float')
  weight: number

  @Column('int')
  weekly_frequency: number
  
  @Column()
  comments: string

  @Column('boolean')
  is_evaluated: boolean

  @Column('timestamp')
  revaluation: Date

  @ManyToOne(() => HistoricTrainingSheet, historic => historic.training_sheet)
  historic: HistoricTrainingSheet

  @OneToMany(() => Training, training => training.training_sheet)
  training: Training[]

  @ManyToMany(() => Muscle)
  @JoinTable()
  muscles: Muscle[]

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export default TrainingSheet
