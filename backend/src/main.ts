import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//import { JwtAuthGuard } from './auth/JwtAuthGuard';
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

  //app.useGlobalGuards(new JwtAuthGuard()); # Just guard selected routes
  await app.listen(3000);

  let user = app.get(getRepositoryToken(User));
  let role = app.get(getRepositoryToken(Role));
  await addDefaultAdmin(user, role);
}
bootstrap();

async function addDefaultAdmin(user, role) {
  try {
    const existingRole = await role.findOne({ where: { id: 2 } });
    if (!existingRole) {
      const consultantRole = new Role();
      consultantRole.name = "consultant";
      await role.save(consultantRole);
      
      const adminRole = new Role();
      adminRole.name = "administrator";
      await role.save(adminRole);
      console.log("Administrator role created.");
    }else{
      console.log("Administrator role exits.");
    }

     const superAdmin = await user.findOne({ where: { role: { id: 2 } } });
    if (!superAdmin) {
      const newUser = new User();
      newUser.email = "admin@admin.com";
      newUser.firstname = "admin";
      newUser.lastname = "";
      newUser.profile_img = "";
      newUser.tel = "";
      newUser.password = await bcrypt.hash("admin", 10);

      // Retrieve the role from the database
      const adminRole = await role.findOne({ where: { id: 2 } });
      if (adminRole) {
        newUser.role = adminRole;
        await user.save(newUser);
        console.log("Default admin added.");
      } else {
        console.log("Admin role not found.");
      }
    } 
  } catch (error) {
    console.log(error);
  }
}
