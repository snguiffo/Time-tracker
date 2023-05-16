import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity/project.entity';
import { Timer } from './timer.entity/timer.entity';
import { Status } from './status.entity/status.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Timer, Status]),
             UsersModule
            ],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {

}
