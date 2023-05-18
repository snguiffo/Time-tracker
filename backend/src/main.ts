import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/JwtAuthGuard';
import { User } from './users/user.entity/user.entity';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from './users/role.entity/role.entity';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  );

  app.useGlobalGuards(new JwtAuthGuard());
  await app.listen(3000);

  let user = app.get(getRepositoryToken(User));
  await addDefaultAdmin(user);
}
bootstrap();

async function addDefaultAdmin(user) {
  user.find({where: { role: {id: 2} }}).then(async (superAdmin) => {//TODO define global Role & add default admin params to .env
    if (superAdmin.length === 0) {
      try {
        const newUser = new User()
          newUser.email = "admin@admin.com";
          newUser.firstname = "admin";
          newUser.lastname = "";
          newUser.profile_img = "";
          newUser.tel = "";
          newUser.password = await bcrypt.hash("admin", 10);
          newUser.role = { id: 2 } as Role;
        await user.save(newUser);
        console.log("default admin added.");
      } catch (error: any) {
        console.log(error);
      }
    }
  });
}