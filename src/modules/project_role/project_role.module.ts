import { Module } from '@nestjs/common';
import { ProjectRoleService } from './project_role.service';
import { ProjectRoleController } from './project_role.controller';

@Module({
  controllers: [ProjectRoleController],
  providers: [ProjectRoleService],
})
export class ProjectRoleModule {}
