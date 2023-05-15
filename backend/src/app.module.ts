import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [TypeOrmModule.forRoot({//TODO replace all with process.env.DATABASE_HOST, process.env.DATABASE_PORT, ...
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: '',
      database: 'project_db',
      autoLoadEntities: true,
      synchronize: true,
    }), UsersModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
