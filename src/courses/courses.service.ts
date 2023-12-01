import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag> 
  ) {}

  async findAll() {
    const courses = await this.courseRepository.find({relations:['tags']});
    return courses;
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({where: {id:id}, relations:['tags']})
    if(!course) {
      throw new NotFoundException(`Course id ${id} not found!`);
    }
    return course;
  }

  async create(createCourseDto: CreateCourseDTO) {
    const tags = await Promise.all(
      createCourseDto.tags.map(name => this.preloadTagByName(name)),
    );

    const course = this.courseRepository.create({
      ...createCourseDto,
      tags     
    })

    return this.courseRepository.save(course);
  }

  async update(id: number, updateCourseDto: UpdateCourseDTO) {
    const tags = updateCourseDto.tags && await Promise.all(
      updateCourseDto.tags.map(name => this.preloadTagByName(name))
    )
    const course = await this.courseRepository.preload({
      ... updateCourseDto,
      id,
      tags,
    }) // cria um obj com base nos params e pega na tbl

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

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({where: {name: name}});
    if (tag) {
      return tag
    }
   
    return this.tagRepository.create({ name: name });
  }
}