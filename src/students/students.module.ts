import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from './students.entity';
import { StudentsService } from './students.service';
import { StudentResolver } from './students.resolver'

@Module({
  providers: [StudentResolver,StudentsService],
  imports:[TypeOrmModule.forFeature([Students])],
  exports:[StudentsService]
})
export class StudentsModule {}
