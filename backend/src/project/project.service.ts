import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity/project.entity';
import { Timer } from './timer.entity/timer.entity';
import { LogProjectInfoDto } from './dto/logProject.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>, 
    @InjectRepository(Timer)
    private readonly timerRepository: Repository<Timer>,
  ) {}

  async createProject(projectData: Partial<Project>): Promise<Project> {
    const project = this.projectRepository.create(projectData);
    return this.projectRepository.save(project);
  }

  async getProjectById(_id: number): Promise<Project | undefined> {
    return this.projectRepository.findOne({
        where:{
            id:_id
        }
    });
  }

  async getProjectByConsultantId(userId: number): Promise<Project[]> {
    return this.projectRepository.find({ where: { consultant: { id: userId } } });
  }

  async updateProject(id: number, projectData: Partial<Project>): Promise<Project | undefined> {
    await this.projectRepository.update(id, projectData);
    return this.getProjectById(id);
  }

  async deleteProject(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async assignProjectToConsultant(projectId: number, consultantId: number): Promise<Project> {
    const project = await this.getProjectById(projectId);
    if (!project) {
      throw new Error('Project non trouvé');
    }

    const user = await this.userService.getUser(consultantId);
    if (!user) {
      throw new Error('Consultant non trouvé');
    }
    project.consultant = user;
    return this.projectRepository.save(project);
  }

  async assignProjectToReviewer(projectId: number, reviewerId: number): Promise<Project> {
    const project = await this.getProjectById(projectId);
    if (!project) {
      throw new Error('Project non trouvé');
    }

    const user = await this.userService.getUser(reviewerId);
    if (!user) {
      throw new Error('Reviewer non trouvé');
    }

    project.reviewer = user;
    return this.projectRepository.save(project);
  }

  async logProjectInfo(projectId: number, logProjectInfoDto: LogProjectInfoDto): Promise<Timer> {
    const project = await this.getProjectById(projectId);
    if (!project) {
      throw new Error('Project non trouvé');
    }

    const timer = new Timer();
    timer.description = logProjectInfoDto.description || '';
    timer.creationDate = logProjectInfoDto.creationDate;
    timer.startTime = logProjectInfoDto.startTime;
    timer.endTime = logProjectInfoDto.endTime;
    timer.totalDuration = logProjectInfoDto.totalDuration;
    timer.project = project;

    return this.timerRepository.save(timer);
  }

}
