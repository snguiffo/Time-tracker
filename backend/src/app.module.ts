import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProjectModule } from './project/project.module';
import { loadFixtures } from './demo/loadData';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/JwtStrategy';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.MYSQL_ROOT_PASSWORD||"",
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }), 
    UsersModule, 
    ProjectModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '6h' },
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtStrategy],
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
