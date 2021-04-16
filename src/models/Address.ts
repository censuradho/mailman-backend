import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('address')
class Address {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  cep: string

  @Column()
  street: string

  @Column()
  street_number: string

  @Column()
  neighborhood: string

  @Column()
  city: string

  @Column()
  country: string

  @Column({ nullable: true })
  complement?: string

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date

  constructor () {
    if (!this.id) this.id = uuid()
  }
}

export default Address
