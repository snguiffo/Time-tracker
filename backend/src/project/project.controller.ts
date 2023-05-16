import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity/project.entity';
import { Timer } from './timer.entity/timer.entity';
import { LogProjectInfoDto } from './dto/logProject.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Body() projectData: Partial<Project>): Promise<Project> {
    return this.projectService.createProject(projectData);
  }

  @Get(':id')
  async getProjectById(@Param('id') id: number): Promise<Project | undefined> {
    return this.projectService.getProjectById(id);
  }

  @Get('consultant/:userId')
  async getProjectByConsultantId(@Param('userId') userId: number): Promise<Project[]> {
    return this.projectService.getProjectByConsultantId(userId);
  }

  @Put(':id')
  async updateProject(@Param('id') id: number, @Body() projectData: Partial<Project>): Promise<Project | undefined> {
    return this.projectService.updateProject(id, projectData);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: number): Promise<void> {
    return this.projectService.deleteProject(id);
  }

  @Put(':id/consultant/:consultantId')
  async assignProjectToConsultant(
    @Param('id') projectId: number,
    @Param('consultantId') consultantId: number,
  ): Promise<Project> {
    return this.projectService.assignProjectToConsultant(projectId, consultantId);
  }

  @Put(':id/reviewer/:reviewerId')
  async assignProjectToReviewer(
    @Param('id') projectId: number,
    @Param('reviewerId') reviewerId: number,
  ): Promise<Project> {
    return this.projectService.assignProjectToReviewer(projectId, reviewerId);
  }

  @Post(':id/log')
  async logProjectInfo(
    @Param('id') projectId: number,
    @Body() logProjectInfoDto: LogProjectInfoDto,
  ): Promise<Timer> {
    return this.projectService.logProjectInfo(projectId, logProjectInfoDto);
  }
}
