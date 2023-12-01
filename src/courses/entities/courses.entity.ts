import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity('courses') // nome da tbl no BD
export class Course {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
  
  @Column()
  description: string
  
  @Column('json', {nullable: true})
  tags: string[]
}