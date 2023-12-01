import { Injectable } from '@nestjs/common';
import { Course } from './entities/courses.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'NestJS',
      description: 'Curso sobre NestJs',
      tags: ['nodejs', 'backend']
    }
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    return this.courses.find(course => course.id === Number(id));
  }

  create(createCourseDto: any) {
    this.courses.push(createCourseDto);
    return this.courses.length > 0 ? this.courses[this.courses.length - 1] : null;
  }

  update(id: number, updateCourseDto: any) {
    const existingCourse = this.findOne(id);
    
    if (existingCourse) {
      const index = this.courses.findIndex(course => course.id === Number(id));
      this.courses[index] = {
        id,
        ... updateCourseDto
      }
      return this.courses[index];
    }
    
    return null;
  }

  remove(id: number) { 
    const index = this.courses.findIndex(course => course.id === Number(id));
    if (index >= 0) {
      this.courses.splice(index, 1);
    }
  }
}