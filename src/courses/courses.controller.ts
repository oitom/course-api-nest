import { Body, Controller, Delete, Get, Param, Put, Post, Res, HttpCode, HttpStatus, HttpException, NotFoundException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {

  constructor(private readonly coursesService: CoursesService) {}
  
  @Get()
  async findAll(@Res() response) {
    const courses =  await this.coursesService.findAll();

    if (!courses) {
      throw new HttpException(`No courses found`, HttpStatus.NOT_FOUND);
    }

    return response.status(200).json({ courses: courses});
  }

  @Get(':id')
  async findOne(@Param() params) {
    const course = await this.coursesService.findOne(params.id);

    if (!course) {
      throw new NotFoundException(`Course ${params.id} not found`);
    }
    return course;
  }

  @Post()
  async create(@Body() createcoursedto: CreateCourseDTO, @Res() response) {
    const course = await this.coursesService.create(createcoursedto);
    
    return response.status(200).json({ courses: course});
  }
  
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCourseDTO: UpdateCourseDTO) {
    return await this.coursesService.update(id, updateCourseDTO);
  }
  
  @HttpCode(HttpStatus.NO_CONTENT) // or (204)
  @Delete(':id')
  async remove(@Param('id') id: number) {
   return await this.coursesService.remove(id);
  }
  
}