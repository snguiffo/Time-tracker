import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProjectModule } from './project/project.module';
import { loadFixtures } from './demo/loadData';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD||"",
      database: process.env.DATABASE_NAME,
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
      //await loadFixtures('users', this.dbConnection);
      console.log('Fixtures loaded successfully.');
    } catch (error) {
      console.error('Error loading fixtures:', error);
    }
  }
}
