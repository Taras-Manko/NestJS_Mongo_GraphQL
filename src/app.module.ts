import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Lesson } from './lesson/lesson.entity';
import { LessonModule } from './lesson/lesson.module';
import { Students } from './students/students.entity';
import { StudentsModule } from './students/students.module';
import { db } from '../config/db.congig'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mongodb',
      url:db.DB,
      synchronize:true,
      useUnifiedTopology:true,
      entities:[
        Lesson,Students
      ]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    LessonModule,
    StudentsModule
  ],
})
export class AppModule {}
