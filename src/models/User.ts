import { Column, CreateDateColumn, Entity, JoinTable, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

import Address from './Address'
import HistoricTrainingSheet from "./HistoricTrainingSheet";

@Entity('user')
class User {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  username: string 

  @Column()
  name: string

  @Column()
  last_name: string

  @Column()
  password: string

  @Column({ unique: true })
  email: string

  @OneToOne(() => HistoricTrainingSheet)
  @JoinTable()
  historic_training: HistoricTrainingSheet

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

export default User
