import { v4 as uuid } from 'uuid'

import { Column, CreateDateColumn, PrimaryColumn } from "typeorm"

class Survey {

  @PrimaryColumn()
  readonly id: string

  @Column()
  title: string

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  @CreateDateColumn()
  updated_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }

}

export default Survey
