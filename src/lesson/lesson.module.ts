import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service'
import { LessonResolver} from './lesson.resolver'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { StudentsModule } from 'src/students/students.module';

@Module({
    imports:[TypeOrmModule.forFeature([Lesson]),StudentsModule],
    providers:[LessonResolver,LessonService]
})
export class LessonModule {}
