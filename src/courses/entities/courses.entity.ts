import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tag.entity"

@Entity('courses') // nome da tbl no BD
export class Course {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
  
  @Column()
  description: string
  
  @JoinTable() // lado principal do rel entre tabelas
  @ManyToMany(()=> Tag, tag => tag.courses, { cascade: true }) // dados relacionais tbm sao atualizados  
  tags: Tag[]
}