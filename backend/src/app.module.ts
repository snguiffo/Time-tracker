import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProjectModule } from './project/project.module';
import { loadFixtures } from './demo/loadData';
import { DataSource } from 'typeorm';

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
    }), /*UsersModule,*/ ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly dbConnection: DataSource) {
    //chargement des données demo
    this.loadFixtures();
  }
  
  async loadFixtures(): Promise<void> {
    try {
      //await loadFixtures('roles', this.dbConnection);
      await loadFixtures('users', this.dbConnection);
      console.log('Fixtures loaded successfully.');
    } catch (error) {
      console.error('Error loading fixtures:', error);
    }
  }
}
