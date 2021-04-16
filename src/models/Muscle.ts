import { Entity, CreateDateColumn, UpdateDateColumn, PrimaryColumn, Column, OneToMany } from 'typeorm'
import { v4 as uuid } from 'uuid'

import TrainingSheet from './TrainingSheet'
import Training from './Training'

@Entity('muscle')
class Muscle {

  @PrimaryColumn('uuid')
  id: string

  @Column({ unique: true })
  label: string

  @OneToMany(() => Training, training => training.muscle)
  training: Training[]

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

export default Muscle
