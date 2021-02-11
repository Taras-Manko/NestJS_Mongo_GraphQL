import { Resolver,Query,Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";
import { lessonInput } from './lesson.input'
import { AssignStudentsAnLessonInput } from "./assign-student.inputs";
import { Lesson } from "./lesson.entity";
import { StudentsService } from "src/students/students.service";
@Resolver(of => LessonType)
export class LessonResolver {
    constructor( 
        private lessonServise:LessonService,
        private studentServise:StudentsService
        ) {}
    @Query(returns => LessonType)
    lesson(
        @Args('id') id:string
    ) {
        return this.lessonServise.getLesson(id)
        }
    @Query(returns => [LessonType])    
    lessons() {
        return this.lessonServise.getLessons()
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput:lessonInput) {
        return this.lessonServise.createLesson(createLessonInput)
     }

     @Mutation(returns => LessonType)
     assignStudentsAnLesson(
         @Args('assignStudentsAnLessonInput') assignStudentsAnLessonInput:AssignStudentsAnLessonInput
     ) {
        const {lessonId,studentsId} = assignStudentsAnLessonInput
        return this.lessonServise.assignStudentsAnLesson(lessonId,studentsId)
     }

     @ResolveField()
     async students(@Parent() lesson:Lesson) {
        return this.studentServise.getManyStudents(lesson.students)
     }
}