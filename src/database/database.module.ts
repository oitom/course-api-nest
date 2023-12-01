import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { Course } from '../courses/entities/courses.entity'

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'devtraing',
  entities: [Course],
  synchronize: true, // sincroniza as propriedades do entity como coluna no bd
  logging: true, // Ativa o log do TypeORM no console
  logger: 'advanced-console', // Tipo de logger
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          ... dataSourceOptions
        }
      }
    })
  ]
})
export class DatabaseModule {}
