import { Resolver,Query,Mutation, Args } from "@nestjs/graphql";
import { StudentType } from "./students.type";
import { StudentsService } from './students.service'
import { CreateStudentInput } from "./create-student.input";

@Resolver(of => StudentType)
export class StudentResolver {
    constructor( 
        private studentServise:StudentsService
        
        ) {}

    @Query(returns => [StudentType])
    studentsAll() {
        return this.studentServise.getStudents()
    }

    @Query(returns => StudentType)
    studentId(
        @Args('id') id:string
    ) {
        return this.studentServise.getStudentId(id)
    }

    @Mutation(returns => StudentType)
    createStudent(
        @Args('createStudentInput') createStudentInput:CreateStudentInput
    ) {
        return this.studentServise.createStudent(createStudentInput)
        }
    }