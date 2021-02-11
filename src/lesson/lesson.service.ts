import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuidv4 } from 'uuid';
import { lessonInput } from './lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonModel:Repository<Lesson>
      
        ) {}

    async getLesson(id:string):Promise<Lesson> {
        return this.lessonModel.findOne({ id })
    }

    async getLessons():Promise<Lesson[]> {
        return await this.lessonModel.find()
    }

    async createLesson(createLessonInput:lessonInput):Promise<Lesson> {
        const {name,startDate,endDate,students} = createLessonInput;
        const lesson = await this.lessonModel.create({
            id:uuidv4(),
            name,
            startDate,
            endDate,
            students
        })
        return this.lessonModel.save(lesson)
    }

    async assignStudentsAnLesson(lessonId:string,studentsId:string[]):Promise<Lesson> {
        const lesson = await this.lessonModel.findOne({id : lessonId})
        lesson.students = [...lesson.students,...studentsId]
        return this.lessonModel.save(lesson)
    }
}
