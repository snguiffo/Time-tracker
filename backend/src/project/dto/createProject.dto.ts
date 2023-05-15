import { User } from "src/users/user.entity/user.entity";


export class CreateProjectDTO {
    name: string;
    description: string;

    consultant:User;
  }