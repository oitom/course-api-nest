import { Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Course } from '../entities/courses.entity'
import { CoursesService } from "../courses.service"

@Entity('tags') // nome da tbl no BD
export class Tag {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  name: string

  @ManyToMany(()=> Course, course => course.tags)
  courses: Course[]
}