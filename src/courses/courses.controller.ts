import { Body, Controller, Delete, Get, Param, Put, Post, Res, HttpCode, HttpStatus, HttpException, NotFoundException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {

  constructor(private readonly coursesService: CoursesService) {}
  
  @Get()
  findAll(@Res() response) {
    const courses =  this.coursesService.findAll();

    if (courses.length == 0) {
      throw new HttpException(`No courses found`, HttpStatus.NOT_FOUND);
    }

    return response.status(200).json({ courses: courses});
  }

  @Get(':id')
  findOne(@Param() params) {
    const course = this.coursesService.findOne(params.id);

    if (!course) {
      throw new NotFoundException(`Course ${params.id} not found`);
    }
    return course;
  }

  @Post()
  create(@Body() createcoursedto: CreateCourseDTO, @Res() response) {
    const course = this.coursesService.create(createcoursedto);
    
    return response.status(200).json({ courses: course});
  }
  
  @Put(':id')
  update(@Param('id') id: number, @Body() updateCourseDTO: UpdateCourseDTO) {
    return this.coursesService.update(id, updateCourseDTO);
  }
  
  @HttpCode(HttpStatus.NO_CONTENT) // or (204)
  @Delete(':id')
  remove(@Param('id') id: number) {
   return this.coursesService.remove(id);
  }
  
}