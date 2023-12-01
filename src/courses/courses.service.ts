import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ) {}

  async findAll() {
    const courses = await this.courseRepository.find({where: {}});
    return courses;
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({where: {id:id}})
    if(!course) {
      throw new NotFoundException(`Course id ${id} not found!`);
    }
    return course;
  }

  async create(createCourseDto: any) {
    const course = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(course);
  }

  async update(id: number, updateCourseDto: any) {
    const course = await this.courseRepository.preload({
      ... updateCourseDto,
      id,
    }) // cria um obj com base nos params e pega na tbl

    console.log(course)

    if(!course) {
      throw new NotFoundException(`Course id ${id} not found!`);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: number) { 
    const course = await this.courseRepository.findOne({where: {id:id}})
    if(!course) {
      throw new NotFoundException(`Course id ${id} not found!`);
    }

    return this.courseRepository.remove(course);
  }
}