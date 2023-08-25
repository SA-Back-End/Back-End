import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectRoleService } from './project_role.service';
import { CreateProjectRoleDto } from './dto/create-project_role.dto';
import { UpdateProjectRoleDto } from './dto/update-project_role.dto';

@Controller('project-role')
export class ProjectRoleController {
  constructor(private readonly projectRoleService: ProjectRoleService) {}

  @Post()
  create(@Body() createProjectRoleDto: CreateProjectRoleDto) {
    return this.projectRoleService.create(createProjectRoleDto);
  }

  @Get()
  findAll() {
    return this.projectRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectRoleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectRoleDto: UpdateProjectRoleDto) {
    return this.projectRoleService.update(+id, updateProjectRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectRoleService.remove(+id);
  }
}
