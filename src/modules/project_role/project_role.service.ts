import { Injectable } from '@nestjs/common';
import { CreateProjectRoleDto } from './dto/create-project_role.dto';
import { UpdateProjectRoleDto } from './dto/update-project_role.dto';

@Injectable()
export class ProjectRoleService {
  create(createProjectRoleDto: CreateProjectRoleDto) {
    return 'This action adds a new projectRole';
  }

  findAll() {
    return `This action returns all projectRole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectRole`;
  }

  update(id: number, updateProjectRoleDto: UpdateProjectRoleDto) {
    return `This action updates a #${id} projectRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectRole`;
  }
}
