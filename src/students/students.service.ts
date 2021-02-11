import { Injectable } from '@nestjs/common';
import { Students } from './students.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput} from './create-student.input'
import { v4 as uuid } from 'uuid'

@Injectable()
export class StudentsService {
    constructor(@InjectRepository(Students) private studentModel:Repository<Students>) {}

    createStudent(createStudentInput:CreateStudentInput ):Promise<Students> {
        const {firstName,lastName} = createStudentInput;
        const student = this.studentModel.create({
            id:uuid(),
            firstName,
            lastName
        })
        return this.studentModel.save(student)
    }
    async getStudents():Promise<Students[]> {
        return await this.studentModel.find()
    }

    async getStudentId(id:string):Promise<Students> {
        return this.studentModel.findOne({ id })
    }

    async getManyStudents(studentId:string[]):Promise<Students[]> {
        return this.studentModel.find({
            where:{
                id:{
                    $in:studentId
                }
            }
        })
    }
}
